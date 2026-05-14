import { motion } from 'framer-motion';
import { PlayCircle, Youtube, Tv, Radio } from 'lucide-react';

const videos = [
  { id: 1, title: "Cyberpunk 2077 Mastery", embedId: "8X2kIfS6fb8", category: "Gameplay" }, 
  { id: 2, title: "Valorant Pro Tactics", embedId: "e_E9W2vsRbQ", category: "Esports" },
  { id: 3, title: "GTA VI Cinematic", embedId: "QdBZY2fkU-0", category: "Trailer" },
  { id: 4, title: "Elden Ring Strategy", embedId: "qLZenOn7WUo", category: "Walkthrough" },
];

const Learn = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-[#ff0055]">
            Gaming Academy // 2026
          </span>
          <h2 className="text-5xl md:text-7xl font-cyber font-black glow-text uppercase">
            SYNDICATE
          </h2>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Learn from the masters. dominate the network.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl px-4">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-2 rounded-[2.5rem] group relative overflow-hidden"
          >
            <div className="relative aspect-video rounded-[2rem] overflow-hidden">
               <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.embedId}?controls=1&modestbranding=1&rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                ></iframe>
                
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                   <div className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-white">
                     {video.category}
                   </div>
                </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-white uppercase tracking-wider group-hover:text-[#00f0ff] transition-colors">{video.title}</h3>
                <PlayCircle className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Channels */}
      <div className="mt-20 w-full max-w-7xl px-4">
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Youtube, label: "Official Channel", color: "text-red-500" },
              { icon: Tv, label: "Live Broadcast", color: "text-[#00f0ff]" },
              { icon: Radio, label: "Syndicate Radio", color: "text-[#b026ff]" }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl flex items-center gap-6 hover:border-white/20 transition-all cursor-pointer">
                <item.icon className={`w-8 h-8 ${item.color}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">{item.label}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Learn;
