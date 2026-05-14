import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/useCart';

const products = [
  { id: 1, name: "Aether Core PC", price: "₹49", image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Nexus RTX 4090", price: "₹99", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Cyber Mechanical Keyboard", price: "₹39", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Precision Mouse", price: "₹29", image: "/precision_mouse.png" },
  { id: 5, name: "UltraWide 4K Monitor", price: "₹79", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Immersive Headset", price: "₹59", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800" },
];

const Buy = () => {
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <section className="min-h-screen py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-cyber font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#b026ff] mb-4 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            PREMIUM ARSENAL
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f0ff] to-[#b026ff] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg tracking-widest uppercase font-light">Equip yourself with next-generation hardware.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative glass-panel rounded-3xl p-2 hover-neon-glow transition-all duration-500 flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
              
              <div className="aspect-[4/3] overflow-hidden rounded-2xl relative">
                {/* Floating Image */}
                <motion.div 
                  className="w-full h-full"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
                
                {/* Price Tag Hologram */}
                <div className="absolute top-4 right-4 glass-panel px-4 py-2 rounded-full border border-[#00f0ff]/30 text-[#00f0ff] font-cyber tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  {product.price}
                </div>
              </div>

              <div className="p-6 text-center flex-1 flex flex-col justify-between relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 font-sans tracking-wide drop-shadow-md">{product.name}</h3>
                
                <button 
                  onClick={() => addToCart(product)}
                  className="relative overflow-hidden w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] transition-all duration-300 group/btn bg-white/5 border border-white/10 hover:border-[#b026ff]/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#b026ff] to-[#00f0ff] opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-3 text-gray-300 group-hover/btn:text-white transition-colors">
                    <ShoppingCart className="w-5 h-5 group-hover/btn:drop-shadow-[0_0_8px_#00f0ff]" /> 
                    <span className="group-hover/btn:drop-shadow-[0_0_8px_#b026ff]">Add to Cart</span>
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Buy;
