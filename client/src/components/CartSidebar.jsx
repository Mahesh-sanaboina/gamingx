import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCart';

const CartSidebar = () => {
  const { cartItems, isCartOpen, toggleCart, removeFromCart, updateQuantity, toggleCheckout } = useCartStore();

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-white/20 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-black/5 z-[70] flex flex-col shadow-[-20px_0_100px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center justify-between p-8 border-b border-black/5 bg-white/40">
              <h2 className="text-2xl font-black flex items-center gap-3 text-[#1a1a2e] uppercase tracking-widest">
                <ShoppingBag className="text-[#0070f3]" /> CART
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300">
                  <ShoppingBag className="w-20 h-20 mb-6 opacity-30" />
                  <p className="text-[10px] uppercase font-black tracking-widest">Your cart is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div layout key={item.id} className="flex gap-6 bg-white/40 p-6 rounded-[2rem] border border-black/5 relative group shadow-sm">
                    <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 border border-black/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-sm text-[#1a1a2e] uppercase tracking-wider mb-2">{item.name}</h3>
                      <p className="text-[#0070f3] font-cyber text-sm mb-4">{item.price}</p>
                      <div className="flex items-center gap-4 bg-white/60 w-fit rounded-xl border border-black/5 p-1.5 shadow-sm">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-[#0070f3] text-gray-400"><Minus className="w-4 h-4" /></button>
                        <span className="text-xs font-black w-6 text-center text-[#1a1a2e]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-[#0070f3] text-gray-400"><Plus className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="absolute top-6 right-6 p-2 text-gray-300 hover:text-[#ff0055] transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-8 border-t border-black/5 bg-white/60 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-gray-400 uppercase text-[10px] font-black tracking-widest">Subtotal</span>
                  <span className="text-3xl font-black text-[#1a1a2e]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
                <button 
                  onClick={toggleCheckout}
                  className="w-full py-5 bg-[#1a1a2e] hover:bg-[#0070f3] text-white font-black rounded-2xl transition-all shadow-xl tracking-[0.3em] text-[10px]"
                >
                  SECURE CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
