import { useState } from 'react';
import { ShoppingCart, LayoutDashboard, Menu, X } from 'lucide-react';
import { useCartStore } from '../store/useCart';
import { useAuthStore } from '../store/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ activeSection, setActiveSection, onAdminClick }) => {
  const navItems = ['Home', 'Buy', 'Learn', 'Building', 'Connections'];
  const { cartItems, toggleCart } = useCartStore();
  const { isAdminAuthenticated } = useAuthStore();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isDashboard = activeSection === 'dashboard';
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (sectionKey) => {
    setActiveSection(sectionKey);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0070f3] to-[#b026ff] flex items-center justify-center shadow-[0_0_20px_rgba(0,112,243,0.2)] group-hover:shadow-[0_0_30px_rgba(0,112,243,0.4)] transition-all">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-cyber glow-text tracking-[0.2em]">GAMINGX</span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center bg-white/40 rounded-full p-1.5 border border-white/60 backdrop-blur-2xl">
              {navItems.map((item) => {
                const id = item.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(id)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/60 text-[#0070f3] shadow-sm' 
                        : 'text-gray-500 hover:text-[#1a1a2e] hover:bg-white/30'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 ml-6 pl-6 border-l border-black/5">
              <button
                onClick={onAdminClick}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  isDashboard
                    ? 'bg-[#b026ff]/10 border-[#b026ff]/40 text-[#b026ff] shadow-sm'
                    : 'border-black/5 text-gray-400 hover:border-[#b026ff]/30 hover:text-[#b026ff]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{isAdminAuthenticated ? 'Dashboard' : 'Admin'}</span>
              </button>

              <button 
                onClick={toggleCart}
                className="relative p-2.5 rounded-full bg-white/40 border border-white/60 text-[#1a1a2e] hover:border-[#0070f3]/40 hover:text-[#0070f3] transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#0070f3] to-[#b026ff] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
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
              className="relative p-2 text-[#1a1a2e]"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0070f3] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#1a1a2e]"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Light */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-black/5 overflow-hidden"
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
                        ? 'bg-gradient-to-r from-[#0070f3]/10 to-transparent text-[#0070f3] border-l-2 border-[#0070f3]' 
                        : 'text-gray-500 hover:bg-black/5 hover:text-[#1a1a2e]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
