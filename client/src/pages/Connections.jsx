import { motion } from 'framer-motion';
import { Gamepad2, Users, MessageSquare, Twitter, Instagram, Github } from 'lucide-react';

const connections = [
  { id: 1, name: "Steam", icon: Gamepad2, color: "#1b9ef7", desc: "Sync your library and cloud saves." },
  { id: 2, name: "Discord", icon: MessageSquare, color: "#5865F2", desc: "Join 50k+ elite syndicate members." },
  { id: 3, name: "Instagram", icon: Instagram, color: "#ff0055", desc: "Follow our hardware evolution." },
  { id: 4, name: "Twitter", icon: Twitter, color: "#00f0ff", desc: "Real-time updates and tech news." },
  { id: 5, name: "Syndicate Hub", icon: Users, color: "#b026ff", desc: "Access the private gaming network." },
  { id: 6, name: "Source Code", icon: Github, color: "#ffffff", desc: "View our open source build specs." },
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
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-[#00f0ff]">
            Syndicate Hub // 2026
          </span>
          <h2 className="text-5xl md:text-7xl font-cyber font-black glow-text uppercase">
            CONNECT
          </h2>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Link your neural profile to the global network.
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
             <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <conn.icon className="w-8 h-8" style={{ color: conn.color }} />
             </div>
             <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2">{conn.name}</h3>
             <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 uppercase tracking-tight">
               {conn.desc}
             </p>
             <div className="flex items-center gap-2">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-[#00f0ff] transition-colors">ESTABLISH LINK</span>
                <div className="flex-1 h-[1px] bg-white/5 group-hover:bg-[#00f0ff]/30 transition-colors" />
             </div>
          </motion.div>
        ))}
      </div>

      {/* Global Status */}
      <div className="mt-32 p-10 rounded-[3rem] glass-card w-full max-w-4xl border-[#00f0ff]/20">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_#22c55e]" />
               <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-widest">Global Servers Online</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Neural Link Latency: 12ms</p>
               </div>
            </div>
            <button className="px-10 py-4 rounded-full bg-[#00f0ff] text-black font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-transform">
               View Live Stats
            </button>
         </div>
      </div>
    </div>
  );
};

export default Connections;
