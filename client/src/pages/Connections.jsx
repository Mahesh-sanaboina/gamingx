import { motion } from 'framer-motion';
import { Gamepad2, Users, MessageSquare, Twitter, Instagram, Github } from 'lucide-react';

const connections = [
  { id: 1, name: "Steam", icon: Gamepad2, color: "#1b9ef7", desc: "Sync your modern library." },
  { id: 2, name: "Discord", icon: MessageSquare, color: "#5865F2", desc: "Join 50k+ ethereal members." },
  { id: 3, name: "Instagram", icon: Instagram, color: "#ff0055", desc: "Follow the minimalist evolution." },
  { id: 4, name: "Twitter", icon: Twitter, color: "#0070f3", desc: "Real-time tech updates." },
  { id: 5, name: "Nexus Hub", icon: Users, color: "#b026ff", desc: "Access the private network." },
  { id: 6, name: "Open Specs", icon: Github, color: "#1a1a2e", desc: "View our open build data." },
];

const Connections = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/40 border border-white/60 text-[10px] font-black uppercase tracking-[0.4em] text-[#0070f3] shadow-sm">
            Nexus Hub // 2026
          </span>
          <h2 className="text-5xl md:text-7xl font-cyber font-black glow-text uppercase">
            CONNECT
          </h2>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Establish your modern neural profile.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
        {connections.map((conn, i) => (
          <motion.div
            key={conn.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-10 rounded-[2.5rem] group cursor-pointer"
          >
             <div className="w-16 h-16 rounded-2xl bg-white/60 border border-white/80 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                <conn.icon className="w-8 h-8" style={{ color: conn.color }} />
             </div>
             <h3 className="text-2xl font-black text-[#1a1a2e] uppercase tracking-wider mb-2">{conn.name}</h3>
             <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 uppercase tracking-tight">
               {conn.desc}
             </p>
             <div className="flex items-center gap-2">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#1a1a2e]/40 group-hover:text-[#0070f3] transition-colors">ESTABLISH LINK</span>
                <div className="flex-1 h-[1px] bg-black/5 group-hover:bg-[#0070f3]/30 transition-colors" />
             </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 p-10 rounded-[3rem] glass-card w-full max-w-4xl border-white/80">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse shadow-[0_0_15px_#4ade80]" />
               <div>
                  <h4 className="text-lg font-black text-[#1a1a2e] uppercase tracking-widest">Modern Nodes Online</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Ethereal Link Latency: 8ms</p>
               </div>
            </div>
            <button className="px-10 py-4 rounded-full bg-[#1a1a2e] text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#0070f3] transition-all">
               View Live Stats
            </button>
         </div>
      </div>
    </div>
  );
};

export default Connections;
