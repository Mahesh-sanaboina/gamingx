import { motion } from 'framer-motion';
import { ChevronRight, Shield, Zap, Globe } from 'lucide-react';

const Home = ({ setActiveSection }) => {
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center mb-20 overflow-hidden">
        {/* Background Visual Element */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[50px] scale-105"
            style={{ backgroundImage: `url('/white_luxury_gaming_setup_1778756950863.png')` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/60 to-[#f8faff]" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          {/* Animated Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 border border-white/50 text-[10px] font-black uppercase tracking-[0.5em] text-[#0070f3] shadow-sm">
              Ethereal Protocol Enabled
            </span>
            
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-cyber font-black leading-none uppercase tracking-tight">
              <span className="text-[#1a1a2e]">NEXT-GEN</span><br/>
              <span className="glow-text">GAMINGX</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 font-medium tracking-widest max-w-2xl mx-auto uppercase opacity-80">
              The modern luxury standard for futuristic digital ecosystems.
            </p>
          </motion.div>

          {/* Luxury CTA - Light */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12"
          >
            <button 
              onClick={() => setActiveSection('buy')}
              className="group relative inline-flex items-center justify-center gap-6 px-16 py-7 rounded-full transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_20px_60px_rgba(0,112,243,0.1)] overflow-hidden"
            >
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 p-[2px] rounded-full bg-gradient-to-r from-[#0070f3] via-[#b026ff] to-[#0070f3] bg-[length:200%_100%] animate-gradient-x">
                <div className="w-full h-full bg-white rounded-full transition-colors group-hover:bg-transparent" />
              </div>

              {/* Text & Icon */}
              <span className="relative z-10 text-[#1a1a2e] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] group-hover:text-white transition-all duration-300 whitespace-nowrap">
                Launch Experience
              </span>
              <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-r from-[#0070f3] to-[#b026ff] flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:scale-110 shadow-lg">
                <ChevronRight className="w-4 h-4 text-white group-hover:text-[#0070f3] transition-colors" />
              </div>

              {/* Hover Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </button>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 hidden md:block">
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#0070f3] to-transparent" />
        </div>
      </section>

      {/* Luxury Feature Grid - Light */}
      <section className="w-full max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "CLEAN ARCHITECTURE", desc: "Minimalist hardware blueprints with peak performance scaling.", color: "from-blue-400" },
            { icon: Shield, title: "QUANTUM SECURE", desc: "Encrypted ethereal network for high-security syndicate links.", color: "from-purple-400" },
            { icon: Globe, title: "GLOBAL BROADCAST", desc: "Low latency cloud infrastructure optimized for bright environments.", color: "from-pink-400" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-10 rounded-[2.5rem] group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} to-transparent p-[1px] mb-8`}>
                <div className="w-full h-full bg-white/80 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-transparent">
                  <feature.icon className="w-6 h-6 text-[#1a1a2e] group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-xl font-black text-[#1a1a2e] mb-4 tracking-widest uppercase">{feature.title}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed uppercase tracking-tight">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
