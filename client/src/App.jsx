import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Learn from './pages/Learn';
import Building from './pages/Building';
import Connections from './pages/Connections';
import AdminDashboard from './pages/AdminDashboard';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import AnimatedBackground from './components/AnimatedBackground';

// Transition variants for the cinematic page switch
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20, 
    filter: "blur(10px)",
    scale: 0.98
  },
  in: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    scale: 1
  },
  out: { 
    opacity: 0, 
    y: -20, 
    filter: "blur(10px)",
    scale: 1.02
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const mainRef = useRef(null);

  // Scroll to top of main content whenever section changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return <Home setActiveSection={setActiveSection} />;
      case 'buy': return <Buy />;
      case 'learn': return <Learn />;
      case 'building': return <Building />;
      case 'connections': return <Connections />;
      case 'dashboard': return <AdminDashboard />;
      default: return <Home setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="relative text-white font-sans min-h-screen selection:bg-[#00f0ff]/30 selection:text-[#00f0ff] overflow-hidden bg-[#030014]">
      
      <AnimatedBackground />

      <div className="relative z-10 h-screen flex flex-col">
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
        <CartSidebar />
        <CheckoutModal />
        
        {/* Main Content Area - scrolls to top on section change */}
        <main ref={mainRef} className="flex-1 overflow-y-auto overflow-x-hidden pt-20 pb-12 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-full flex items-center justify-center w-full"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
