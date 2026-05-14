import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const AnimatedBackground = () => {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  
  // Smooth spring physics for mouse tracking
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030014]">
      {/* Layer 1: Looping Gaming Video Background */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Tech/Cyberpunk style abstract looping video */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-4174-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Layer 2: Parallax Mouse-Follow Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY
        }}
      />

      {/* Layer 3: Animated Aurora Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#b026ff]/30 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#00f0ff]/30 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-[#ff0055]/20 rounded-full mix-blend-screen filter blur-[150px] opacity-60 animate-blob animation-delay-4000"></div>
      
      {/* Layer 4: Floating Particles (Framer Motion) */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_15px_#00f0ff]"
          initial={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
            opacity: Math.random() * 0.5 + 0.3,
            scale: Math.random() * 2 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -500 - 200],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Layer 5: Noise Overlay for Cinematic Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      {/* Layer 6: Dark Vignette Edge Fade for Cinematic Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#030014_100%)] opacity-90"></div>
    </div>
  );
};

export default AnimatedBackground;
