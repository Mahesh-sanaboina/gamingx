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
import FuturisticBackground from './components/FuturisticBackground';
import AdminLoginModal from './components/AdminLoginModal';
import MouseFollower from './components/MouseFollower';

// Transition variants for the cinematic page switch
const pageVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)", scale: 0.98 },
  in:      { opacity: 1, y: 0,  filter: "blur(0px)",  scale: 1    },
  out:     { opacity: 0, y: -20, filter: "blur(10px)", scale: 1.02 }
};

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };

function App() {
  const [activeSection, setActiveSection] = useState('home');
  console.log("Current Section:", activeSection);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const mainRef = useRef(null);

  // Scroll to top on section change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setActiveSection(prev => prev === 'dashboard' ? 'home' : 'dashboard');
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowAdminLogin(false);
    setActiveSection('dashboard');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':        return <Home setActiveSection={setActiveSection} />;
      case 'buy':         return <Buy />;
      case 'learn':       return <Learn />;
      case 'building':    return <Building />;
      case 'connections': return <Connections />;
      case 'dashboard':   return <AdminDashboard />;
      default:            return <Home setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="relative text-[#1a1a2e] font-sans min-h-screen selection:bg-[#00f0ff]/20 selection:text-[#0070f3] overflow-hidden">
      <FuturisticBackground />
      <MouseFollower />

      <div className="relative z-10 h-screen flex flex-col">
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onAdminClick={handleAdminClick}
          isAdminAuthenticated={isAdminAuthenticated}
        />
        <CartSidebar />
        <CheckoutModal />
        <AdminLoginModal
          isOpen={showAdminLogin}
          onClose={() => setShowAdminLogin(false)}
          onSuccess={handleAdminLoginSuccess}
        />

        {/* Main Content Area */}
        <main ref={mainRef} className="flex-1 overflow-y-auto overflow-x-hidden pt-20 pb-12 scroll-smooth custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="min-h-full flex items-center justify-center w-full px-4 sm:px-6 lg:px-8"
            >
              <div className="w-full max-w-7xl mx-auto py-8">
                {renderSection()}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
