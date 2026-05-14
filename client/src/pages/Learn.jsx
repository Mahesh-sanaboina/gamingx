import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

const videos = [
  { id: 1, title: "Cyberpunk 2077 Gameplay", embedId: "8X2kIfS6fb8" }, 
  { id: 2, title: "Valorant VCT Highlights", embedId: "e_E9W2vsRbQ" },
  { id: 3, title: "Grand Theft Auto VI Trailer", embedId: "QdBZY2fkU-0" },
  { id: 4, title: "Elden Ring: Shadow of the Erdtree", embedId: "qLZenOn7WUo" },
];

const Learn = () => {
  return (
    <section className="min-h-screen py-32 relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-cyber font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-white to-[#00f0ff] mb-4 drop-shadow-[0_0_20px_rgba(255,0,85,0.4)]"
          >
            LEARN & WATCH
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff0055] to-[#00f0ff] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg tracking-widest uppercase font-light">Learn from the pros. Master your craft.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group relative glass-panel rounded-3xl overflow-hidden hover-neon-glow transition-all duration-500 w-full"
            >
              <div className="aspect-video relative bg-black w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.embedId}?controls=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                ></iframe>
                
                {/* Overlay that fades out on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-0 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                  <PlayCircle className="w-16 h-16 text-white/50" />
                </div>
              </div>
              <div className="p-6 relative z-10 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white font-sans tracking-wide drop-shadow-md group-hover:text-[#00f0ff] transition-colors">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center w-full"
        >
          <a href="https://www.twitch.tv/directory/esports" target="_blank" rel="noopener noreferrer" className="w-full max-w-xl flex items-center gap-6 p-8 rounded-3xl glass-panel hover-neon-glow transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#b026ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 rounded-2xl bg-black/50 border border-[#b026ff]/30 flex items-center justify-center shadow-[0_0_15px_rgba(176,38,255,0.2)] group-hover:shadow-[0_0_25px_rgba(176,38,255,0.5)] transition-shadow">
              <span className="text-4xl">🔴</span>
            </div>
            <div className="relative z-10">
              <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-[#b026ff] transition-colors tracking-wide">Live Tournaments</h4>
              <p className="text-gray-400">Watch top tier competitive gameplay.</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Learn;
