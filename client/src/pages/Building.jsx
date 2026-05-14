import { motion } from 'framer-motion';
import { Download, Cpu, Code2, Globe } from 'lucide-react';

const documents = [
  { id: 1, title: "ULTIMATE RIG", icon: Cpu, color: "#00f0ff", desc: "Military grade blueprints for assembling elite hardware." },
  { id: 2, title: "DEV ARCHIVE", icon: Code2, color: "#b026ff", desc: "Next-gen masterclass for Unreal Engine 5 development." },
];

const Building = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-[#b026ff]">
            Build Protocol // 2026
          </span>
          <h2 className="text-5xl md:text-7xl font-cyber font-black glow-text uppercase">
            ARCHIVE
          </h2>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Download the blueprints. Construct the future.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl px-4">
        {documents.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="glass-card p-12 rounded-[3rem] flex flex-col items-center text-center group"
          >
             <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <doc.icon className="w-10 h-10" style={{ color: doc.color }} />
             </div>
             <h3 className="text-3xl font-black text-white uppercase tracking-wider mb-4">{doc.title}</h3>
             <p className="text-gray-500 text-base font-medium leading-relaxed mb-10 uppercase tracking-tight">
               {doc.desc}
             </p>
             <button className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                <Download className="w-4 h-4" />
                <span>Download Specs</span>
             </button>
          </motion.div>
        ))}
      </div>

      {/* Cloud Archive Status */}
      <div className="mt-20 flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
         <Globe className="w-4 h-4 text-[#00f0ff] animate-spin-slow" />
         <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Cloud Repository Sync: 100% Secure</span>
      </div>
    </div>
  );
};

export default Building;
