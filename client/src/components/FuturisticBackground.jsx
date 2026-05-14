import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

const FuturisticBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#f0f4ff]">
      {/* Base Light Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#f0f7ff] to-[#ffffff]" />

      {/* Animated Ethereal Aurora Waves */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[30%] -left-[20%] w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent blur-[150px]"
      />
      <motion.div 
        animate={{ 
          scale: [1.3, 1, 1.3],
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[30%] -right-[20%] w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/40 via-transparent to-transparent blur-[150px]"
      />

      {/* Floating White Light Streaks */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%', y: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ 
              x: '200%', 
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 20,
              ease: "linear" 
            }}
            className="absolute h-[1px] w-[40%] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{ transform: `rotate(${Math.random() * 20 - 10}deg)` }}
          />
        ))}
      </div>

      {/* Dynamic Cursor Glow - Soft Light */}
      <motion.div 
        style={{ 
          x: springX, 
          y: springY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="absolute pointer-events-none w-[800px] h-[800px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-100/30 via-purple-50/10 to-transparent blur-[120px]"
      />

      {/* Soft Floating Orbs */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            opacity: Math.random() * 0.4 
          }}
          animate={{ 
            y: ['-10%', '110%'],
            opacity: [0, 0.3, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25 + Math.random() * 25, 
            repeat: Infinity,
            ease: "linear",
            delay: -Math.random() * 25
          }}
          className="absolute w-2 h-2 bg-white rounded-full blur-[2px] shadow-[0_0_10px_white]"
        />
      ))}

      {/* Overlay Mesh - Subtle Light Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
      
      {/* Soft Vignette for Depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(255,255,255,0.5)]" />
    </div>
  );
};

export default FuturisticBackground;
