import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const MouseFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -15,
          top: -15,
        }}
        className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full border border-[#0070f3]/40 shadow-[0_0_15px_rgba(0,112,243,0.3)] hidden md:block"
      />
      
      {/* Inner Dot */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -3,
          top: -3,
        }}
        className="fixed pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#0070f3] to-[#b026ff] shadow-[0_0_10px_white] hidden md:block"
      />
    </>
  );
};

export default MouseFollower;
