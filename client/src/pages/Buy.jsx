import { motion } from 'framer-motion';
import { ShoppingCart, Star, ShieldCheck, Zap, Globe } from 'lucide-react';
import { useCartStore } from '../store/useCart';

const products = [
  { id: 1, name: "Aether Core PC", price: "₹1,49,999", image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
  { id: 2, name: "Nexus RTX 4090", price: "₹1,59,999", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800", rating: 5.0 },
  { id: 3, name: "Cyber Mechanical", price: "₹12,999", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
  { id: 4, name: "Precision Mouse", price: "₹8,499", image: "/precision_mouse_1778741461541.png", rating: 4.7 },
  { id: 5, name: "UltraWide 4K", price: "₹89,999", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
  { id: 6, name: "Immersive Headset", price: "₹19,999", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
];

const Buy = () => {
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/40 border border-white/60 text-[10px] font-black uppercase tracking-[0.4em] text-[#0070f3] shadow-sm">
            Ethereal Arsenal // 2026
          </span>
          <h2 className="text-5xl md:text-7xl font-cyber font-black glow-text uppercase">
            EQUIPMENT
          </h2>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Luxury minimalist hardware for the modern elite.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 rounded-[2.5rem] group relative overflow-hidden"
          >
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
              
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/80 flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-bold text-[#1a1a2e]">{product.rating}</span>
                </div>
              </div>
            </div>

            <div className="px-4 pb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black text-[#1a1a2e] uppercase tracking-wider mb-1">{product.name}</h3>
                  <div className="flex gap-2 opacity-50">
                    <ShieldCheck className="w-3 h-3 text-[#0070f3]" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#1a1a2e]">Verified</span>
                  </div>
                </div>
                <span className="text-xl font-cyber text-[#0070f3]">{product.price}</span>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full py-4 rounded-2xl bg-white/40 border border-white/60 flex items-center justify-center gap-3 transition-all hover:bg-[#0070f3] hover:text-white group/btn shadow-sm"
              >
                <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add to Cart</span>
              </button>
            </div>
            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-45deg] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </motion.div>
        ))}
      </div>

      <div className="mt-32 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 hover:opacity-100 transition-all">
         {[
           { icon: Zap, text: "LIGHT SPEED" },
           { icon: ShieldCheck, text: "SECURE NODE" },
           { icon: Star, text: "LUXURY GRADE" },
           { icon: Globe, text: "GLOBAL SYNC" }
         ].map((badge, i) => (
           <div key={i} className="flex flex-col items-center gap-3">
             <badge.icon className="w-8 h-8 text-[#1a1a2e]" />
             <span className="text-[8px] font-black tracking-[0.4em] uppercase text-[#1a1a2e]">{badge.text}</span>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Buy;
