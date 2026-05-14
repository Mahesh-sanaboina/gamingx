import { ShoppingCart, LayoutDashboard } from 'lucide-react';
import { useCartStore } from '../store/useCart';

const Navbar = ({ activeSection, setActiveSection }) => {
  // Dashboard removed from main nav - it's a separate admin button
  const navItems = ['Home', 'Buy', 'Learn', 'Building', 'Connections'];
  const { cartItems, toggleCart } = useCartStore();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isDashboard = activeSection === 'dashboard';

  return (
    <nav className="fixed w-full z-50 top-0 glass-panel border-b border-white/5 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer group" onClick={() => setActiveSection('home')}>
            <span className="text-3xl font-cyber font-black text-transparent bg-clip-text bg-gradient-to-r from-[#b026ff] via-white to-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.6)] tracking-[0.2em] group-hover:drop-shadow-[0_0_25px_rgba(176,38,255,0.8)] transition-all">
              GAMINGX
            </span>
          </div>

          {/* Main Nav Links */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-2 lg:space-x-4">
              {navItems.map((item) => {
                const sectionKey = item.toLowerCase();
                const isActive = activeSection === sectionKey;
                return (
                  <button
                    key={item}
                    onClick={() => setActiveSection(sectionKey)}
                    className={`relative cursor-pointer transition-all px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] group overflow-hidden ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <span className="relative z-10">{item}</span>
                    <div className={`absolute inset-0 rounded-full transition-opacity ${isActive ? 'bg-white/10' : 'bg-white/5 opacity-0 group-hover:opacity-100'}`}></div>
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#b026ff] to-[#00f0ff] transition-all ${isActive ? 'w-full shadow-[0_0_10px_#00f0ff]' : 'w-1/2 opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#00f0ff]'}`}></div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Cart + Separate Admin Button */}
          <div className="flex items-center gap-3 ml-4">

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-3 rounded-full border border-white/5 bg-white/5 hover:border-[#00f0ff]/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff0055] text-white text-[11px] font-black rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-[0_0_15px_#ff0055] border border-white/20">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Separate Admin Dashboard Button */}
            <button
              onClick={() => setActiveSection(isDashboard ? 'home' : 'dashboard')}
              title="Admin Dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                isDashboard
                  ? 'bg-[#b026ff]/20 border-[#b026ff] text-[#b026ff] shadow-[0_0_20px_rgba(176,38,255,0.4)]'
                  : 'border-white/10 text-gray-500 hover:border-[#b026ff]/50 hover:text-[#b026ff] hover:shadow-[0_0_15px_rgba(176,38,255,0.2)]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden lg:inline">Admin</span>
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
