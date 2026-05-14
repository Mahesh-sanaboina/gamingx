import { useState } from 'react';
import { ShoppingCart, LayoutDashboard, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/useCart';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ activeSection, setActiveSection, onAdminClick, isAdminAuthenticated }) => {
  const navItems = ['Home', 'Buy', 'Learn', 'Building', 'Connections'];
  const { cartItems, toggleCart } = useCartStore();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isDashboard = activeSection === 'dashboard';
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (sectionKey) => {
    setActiveSection(sectionKey);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#b026ff] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-cyber glow-text tracking-[0.2em]">GAMINGX</span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center bg-white/5 rounded-full p-1.5 border border-white/5 backdrop-blur-2xl">
              {navItems.map((item) => {
                const id = item.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(id)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/10 text-[#00f0ff] shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 ml-6 pl-6 border-l border-white/10">
              <button
                onClick={onAdminClick}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  isDashboard
                    ? 'bg-[#b026ff]/20 border-[#b026ff] text-[#b026ff] shadow-[0_0_25px_rgba(176,38,255,0.4)]'
                    : 'border-white/10 text-gray-500 hover:border-[#b026ff]/50 hover:text-[#b026ff]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{isAdminAuthenticated ? 'Dashboard' : 'Admin'}</span>
              </button>

              <button 
                onClick={toggleCart}
                className="relative p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#ff0055] to-[#ff4d00] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,0,85,0.5)]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 text-white"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff0055] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-4">
              {navItems.map((item) => {
                const id = item.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(id)}
                    className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold uppercase tracking-[0.15em] transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#00f0ff]/20 to-transparent text-[#00f0ff] border-l-2 border-[#00f0ff]' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-white/5">
                <button
                  onClick={() => { setMobileOpen(false); onAdminClick(); }}
                  className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold uppercase tracking-[0.15em] transition-all duration-200 flex items-center gap-3 ${
                    isDashboard
                      ? 'bg-[#b026ff]/20 text-[#b026ff] border border-[#b026ff]/50'
                      : 'text-gray-500 hover:bg-white/5 hover:text-[#b026ff]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {isAdminAuthenticated ? 'Dashboard' : 'Admin Login'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
