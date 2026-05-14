import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, CheckCircle, Loader2, Cpu, Monitor, Zap, ShieldCheck } from 'lucide-react';

const guides = [
  {
    id: 1,
    title: "Beginner Gaming Setup Guide",
    subtitle: "ZERO TO 100% BLUEPRINT",
    desc: "A comprehensive masterclass on building your first professional gaming station from scratch. PC basics, monitor setup, and accessories.",
    image: "/beginner_setup_guide_1778760377156.png",
    file: "/beginner_guide.txt",
    color: "from-blue-400",
    features: ["PC Basics", "RGB Setup", "Budget Tips"]
  },
  {
    id: 2,
    title: "Advanced Gaming Setup & Streaming",
    subtitle: "PRO PERFORMANCE HUB",
    desc: "The elite guide for high-end builds, dual-PC streaming setups, cable management, and professional room acoustics.",
    image: "/advanced_setup_guide_1778760397240.png",
    file: "/advanced_guide.txt",
    color: "from-purple-400",
    features: ["4K Ray Tracing", "XLR Audio", "Pro Optimization"]
  }
];

const Building = () => {
  const [downloading, setDownloading] = useState(null);
  const [previewing, setPreviewing] = useState(null);

  const handleDownload = (guide) => {
    setDownloading(guide.id);
    
    // Simulate professional download animation
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = guide.file;
      link.download = guide.title.replace(/\s+/g, '_') + ".pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => setDownloading(null), 2000);
    }, 2500);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/40 border border-white/60 text-[10px] font-black uppercase tracking-[0.5em] text-[#0070f3] shadow-sm">
            Ethereal Academy // Build Hub
          </span>
          <h2 className="text-5xl md:text-8xl font-cyber font-black glow-text uppercase leading-none">
            BUILDING
          </h2>
          <p className="text-gray-500 font-medium tracking-[0.3em] uppercase text-xs">
            Professional Blueprints for the Modern Elite.
          </p>
        </motion.div>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl px-4">
        {guides.map((guide, i) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="glass-card p-6 rounded-[3.5rem] group relative overflow-hidden flex flex-col"
          >
            {/* Image Section */}
            <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 border border-white/80">
              <img 
                src={guide.image} 
                alt={guide.title} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
              
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[8px] font-black uppercase tracking-widest text-[#1a1a2e] shadow-sm">
                  {guide.subtitle}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-6 flex-1 flex flex-col">
              <h3 className="text-3xl font-black text-[#1a1a2e] uppercase tracking-tight mb-4 group-hover:text-[#0070f3] transition-colors">{guide.title}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 uppercase tracking-tight">
                {guide.desc}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-10">
                {guide.features.map((feat, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-[#0070f3]" />
                    </div>
                    <span className="text-[7px] font-black uppercase text-gray-400 text-center tracking-widest">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                  onClick={() => handleDownload(guide)}
                  disabled={downloading === guide.id}
                  className="flex-1 relative group/btn py-5 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 disabled:opacity-80"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0070f3] to-[#b026ff] opacity-90" />
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {downloading === guide.id ? (
                      <>
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                        <span className="text-white font-black text-[10px] uppercase tracking-[0.2em]">Downloading...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-white" />
                        <span className="text-white font-black text-[10px] uppercase tracking-[0.2em]">Download Guide</span>
                      </>
                    )}
                  </div>
                </button>

                <button 
                  onClick={() => setPreviewing(guide)}
                  className="flex-1 py-5 rounded-2xl bg-white/40 border border-white/80 flex items-center justify-center gap-3 hover:bg-white/80 transition-all font-black text-[10px] uppercase tracking-[0.2em] text-[#1a1a2e]"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Preview</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-32 p-10 rounded-[3rem] glass-card w-full max-w-4xl border-white/80">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 rounded-2xl bg-white/60 border border-white/80 flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-[#0070f3]" />
               </div>
               <div>
                  <h4 className="text-lg font-black text-[#1a1a2e] uppercase tracking-widest">Verified Blueprints</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Last Updated: 2026-05-14</p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-400">Secure Cloud Sync Active</span>
            </div>
         </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/40 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white border border-white/80 rounded-[3.5rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl relative"
            >
              <div className="p-8 border-b border-black/5 flex items-center justify-between bg-white/40">
                <h3 className="text-xl font-black text-[#1a1a2e] uppercase tracking-widest flex items-center gap-3">
                  <Eye className="w-5 h-5 text-[#0070f3]" /> Guide Preview
                </h3>
                <button onClick={() => setPreviewing(null)} className="p-2 hover:bg-black/5 rounded-full text-gray-400"><Eye className="w-6 h-6 rotate-45" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <div className="space-y-6">
                  <div className="p-8 bg-gray-50 rounded-3xl border border-black/5">
                    <h4 className="text-sm font-black text-[#1a1a2e] uppercase tracking-widest mb-4">TABLE OF CONTENTS</h4>
                    <ul className="space-y-3">
                      {previewing.id === 1 ? (
                        ["Gaming PC Basics", "Monitor & Peripheral Setup", "Budget Optimization", "Beginner Streaming", "RGB Layouts"].map((t, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-xs text-gray-500 uppercase tracking-wider">
                            <CheckCircle className="w-3 h-3 text-[#0070f3]" /> {t}
                          </li>
                        ))
                      ) : (
                        ["High-End Hardware Selection", "Dual-PC Streaming Node", "Pro Audio & XLR Setup", "Cable Routing Strategy", "Performance Benchmarking"].map((t, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-xs text-gray-500 uppercase tracking-wider">
                            <CheckCircle className="w-3 h-3 text-[#b026ff]" /> {t}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed uppercase tracking-tight text-center pt-8 border-t border-black/5">
                    Full document available for download.
                  </p>
                </div>
              </div>
              <div className="p-8 bg-white/40 border-t border-black/5">
                <button 
                  onClick={() => { handleDownload(previewing); setPreviewing(null); }}
                  className="w-full py-4 bg-[#1a1a2e] text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-[#0070f3] transition-all"
                >
                  Unlock Full Guide
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Building;
