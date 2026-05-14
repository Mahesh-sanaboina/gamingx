import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronRight, Shield, Zap, Globe2 } from 'lucide-react';

const Home = ({ setActiveSection }) => {
  return (
    <div className="w-full flex flex-col items-center overflow-y-auto">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center perspective-1000 mb-10">
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Floating Holographic Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8 px-6 py-2 rounded-full glass-panel border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-sm tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.3)] inline-block uppercase"
          >
            System Initialized // v2.0.26
          </motion.div>

          {/* Massive Animated Headline */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-cyber font-black mb-6 tracking-tighter leading-none"
          >
            BEYOND <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b026ff] via-[#ff0055] to-[#00f0ff] drop-shadow-[0_0_30px_rgba(176,38,255,0.8)]">REALITY</span>
          </motion.h1>

          {/* Typing Subtitle */}
          <div className="h-12 mb-12">
            <TypeAnimation
              sequence={[
                'The ultimate ecosystem for next-generation hardware.',
                2000,
                'Immersive interfaces. Cinematic gaming.',
                2000,
                'Experience the future of digital environments.',
                2000,
              ]}
              wrapper="p"
              speed={50}
              className="text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto"
              repeat={Infinity}
            />
          </div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 relative"
          >
            {/* Glowing Aura behind button */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#b026ff] to-[#00f0ff] rounded-full blur-xl opacity-50 animate-pulse"></div>
            
            <button 
              onClick={() => setActiveSection('buy')}
              className="relative cursor-pointer px-12 py-5 bg-black/50 backdrop-blur-md border border-white/20 hover:border-[#00f0ff] text-white font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] text-lg tracking-[0.2em] overflow-hidden group flex items-center justify-center gap-4"
            >
              <span className="relative z-10 group-hover:text-[#00f0ff] transition-colors">INITIALIZE PROTOCOL</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:text-[#00f0ff] transition-colors group-hover:translate-x-2" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </button>
          </motion.div>

        </div>
      </section>

      {/* New Information Section (Below Hero) */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-10 rounded-3xl border border-white/5 hover:border-[#00f0ff]/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Zap className="w-12 h-12 text-[#00f0ff] mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-2xl font-bold font-sans text-white mb-4 tracking-wide">Next-Gen Hardware</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Equip yourself with the most advanced processors and graphics architectures on the planet. Built for zero latency and maximum framerates.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-10 rounded-3xl border border-white/5 hover:border-[#b026ff]/50 hover:shadow-[0_0_30px_rgba(176,38,255,0.2)] transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#b026ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Shield className="w-12 h-12 text-[#b026ff] mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-2xl font-bold font-sans text-white mb-4 tracking-wide">Pro Blueprints</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Access classified build guides and streaming setups used by top-tier professionals. Learn how to construct the ultimate battlestation.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel p-10 rounded-3xl border border-white/5 hover:border-[#ff0055]/50 hover:shadow-[0_0_30px_rgba(255,0,85,0.2)] transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff0055]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Globe2 className="w-12 h-12 text-[#ff0055] mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-2xl font-bold font-sans text-white mb-4 tracking-wide">Global Syndicate</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Connect with thousands of elite gamers in our secure network. Join live tournaments, find squads, and access exclusive hardware drops.
            </p>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default Home;
