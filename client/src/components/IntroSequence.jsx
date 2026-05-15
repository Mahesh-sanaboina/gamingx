import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Cpu, Globe } from 'lucide-react';

const IntroSequence = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Core...");
  
  const statuses = [
    "Initializing Core...",
    "Loading Neural Assets...",
    "Syncing Ethereal Node...",
    "Bypassing Firewalls...",
    "Establishing Secure Link...",
    "Calibrating Aesthetics...",
    "Ready for Launch."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const statusIndex = Math.floor((progress / 100) * (statuses.length - 1));
    setStatus(statuses[statusIndex]);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[10000] bg-[#f0f4ff] flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400 blur-[150px] rounded-full animate-pulse" />
      </div>

      {/* Central Content */}
      <div className="relative w-full max-w-md flex flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#0070f3] to-[#b026ff] flex items-center justify-center shadow-[0_0_50px_rgba(0,112,243,0.3)] mb-12"
        >
          <Zap className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-cyber tracking-[0.4em] text-[#1a1a2e] mb-2 text-center"
        >
          GAMINGX
        </motion.h1>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0070f3] mb-16 opacity-60">ETHEREAL ECOSYSTEM // 2026</p>

        {/* Progress Section */}
        <div className="w-full space-y-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[8px] font-black uppercase tracking-widest text-[#1a1a2e] opacity-40">{status}</span>
            <span className="text-[10px] font-cyber text-[#0070f3]">{progress}%</span>
          </div>
          
          <div className="h-[2px] w-full bg-black/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#0070f3] to-[#b026ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Diagnostic Grid */}
        <div className="grid grid-cols-4 gap-8 mt-16 opacity-30">
          {[Cpu, Shield, Globe, Zap].map((Icon, i) => (
             <motion.div
               key={i}
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
             >
               <Icon className="w-4 h-4 text-[#1a1a2e]" />
             </motion.div>
          ))}
        </div>
      </div>

      {/* Scanning Line Effect */}
      <motion.div 
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0070f3]/10 to-transparent pointer-events-none"
      />
    </motion.div>
  );
};

export default IntroSequence;
