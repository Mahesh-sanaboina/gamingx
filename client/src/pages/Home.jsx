import { motion } from 'framer-motion';
import { ChevronRight, Shield, Zap, Globe2 } from 'lucide-react';

const Home = ({ setActiveSection }) => {
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center mb-20 overflow-hidden">
        {/* Background Visual Element */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[40px] scale-105"
            style={{ backgroundImage: `url('/futuristic_gaming_setup_glow_1778756249257.png')` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020205]/60 to-[#020205]" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          {/* Animated Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.5em] text-[#00f0ff] animate-pulse">
              Quantum Protocol Enabled
            </span>
            
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-cyber font-black leading-none uppercase">
              <span className="text-white">ULTRA</span><br/>
              <span className="glow-text">GAMINGX</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-medium tracking-widest max-w-2xl mx-auto uppercase opacity-80">
              The next generation of luxury digital ecosystems.
            </p>
          </motion.div>

          {/* Luxury CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12"
          >
            <button 
              onClick={() => setActiveSection('buy')}
              className="group relative px-12 py-5 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#b026ff] to-[#00f0ff] opacity-80" />
              <div className="absolute inset-[2px] bg-black rounded-[14px] flex items-center justify-center gap-3 transition-colors group-hover:bg-transparent">
                <span className="relative z-10 text-white font-black text-xs uppercase tracking-[0.3em]">Enter Universe</span>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </div>
              {/* Animated Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </button>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 hidden md:block">
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#00f0ff] to-transparent" />
        </div>
      </section>

      {/* Luxury Feature Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "MAX ARCHITECTURE", desc: "Military grade hardware blueprints for elite performance.", color: "from-[#00f0ff]" },
            { icon: Shield, title: "SECURE PROTOCOL", desc: "Private encrypted network for global syndicate connections.", color: "from-[#b026ff]" },
            { icon: Globe2, title: "GLOBAL NETWORK", desc: "High-speed low latency infrastructure for pro-level gaming.", color: "from-[#ff0055]" }
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
                <div className="w-full h-full bg-[#080810] rounded-2xl flex items-center justify-center transition-colors group-hover:bg-transparent">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-black text-white mb-4 tracking-widest uppercase">{feature.title}</h3>
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
