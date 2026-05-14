import { motion } from 'framer-motion';
import { PlayCircle, Video, Tv, Radio } from 'lucide-react';

const videos = [
  { id: 1, title: "Cyberpunk Mastery", embedId: "8X2kIfS6fb8", category: "Gameplay" }, 
  { id: 2, title: "Valorant Tactics", embedId: "e_E9W2vsRbQ", category: "Esports" },
  { id: 3, title: "GTA VI Ethereal", embedId: "QdBZY2fkU-0", category: "Trailer" },
  { id: 4, title: "Elden Ring Path", embedId: "qLZenOn7WUo", category: "Walkthrough" },
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
          <span className="px-4 py-1.5 rounded-full bg-white/40 border border-white/60 text-[10px] font-black uppercase tracking-[0.4em] text-[#ff0055] shadow-sm">
            Ethereal Academy // 2026
          </span>
          <h2 className="text-5xl md:text-7xl font-cyber font-black glow-text uppercase">
            LEARN
          </h2>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Master the modern digital landscape.
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
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                ></iframe>
                
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                   <div className="px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[8px] font-black uppercase tracking-widest text-[#1a1a2e] shadow-sm">
                     {video.category}
                   </div>
                </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-[#1a1a2e] uppercase tracking-wider group-hover:text-[#0070f3] transition-colors">{video.title}</h3>
                <PlayCircle className="w-6 h-6 text-gray-300 group-hover:text-[#0070f3] transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 w-full max-w-7xl px-4">
         <div className="mb-12 flex items-center justify-between">
            <div>
               <h3 className="text-3xl font-black text-[#1a1a2e] uppercase tracking-widest mb-2">LIVE MASTERCLASS</h3>
               <p className="text-gray-400 text-xs uppercase tracking-widest">Streaming live from the ethereal node.</p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-red-500">LIVE NOW</span>
            </div>
         </div>

         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           whileHover={{ scale: 1.01 }}
           onClick={() => window.open('https://www.twitch.tv', '_blank')}
           className="glass-card p-4 rounded-[4rem] overflow-hidden border-white/80 shadow-2xl cursor-pointer group"
         >
            <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-black">
               <video 
                 autoPlay 
                 loop 
                 muted 
                 playsInline
                 className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
               >
                 <source src="https://assets.mixkit.co/videos/preview/mixkit-gaming-setup-with-neon-lights-4252-large.mp4" type="video/mp4" />
               </video>
               
               <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 via-transparent to-transparent" />
               
               <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <PlayCircle className="w-12 h-12 text-white fill-white/20" />
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2 block">Interactive Session</span>
                    <h4 className="text-4xl font-black text-white uppercase tracking-[0.2em] glow-text">ENTER STREAM</h4>
                  </div>
               </div>

               <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white/40 overflow-hidden">
                       <img src="https://i.pravatar.cc/150?u=mahesh" alt="Instructor" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-white">Mahesh S.</p>
                       <p className="text-[8px] uppercase tracking-widest text-white/40">Head of Ethereal Ops</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                     <span className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[8px] font-black uppercase text-white">4.2K WATCHING</span>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
    </div>
  );
};

export default Learn;
