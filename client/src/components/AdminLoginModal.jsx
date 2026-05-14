import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutDashboard, Lock, User, Mail } from 'lucide-react';

// Hardcoded admin credentials (simple demo gate)
const ADMIN_EMAIL = 'admin@gamingx.com';
const ADMIN_NAME = 'admin';

const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (
        name.trim().toLowerCase() === ADMIN_NAME &&
        email.trim().toLowerCase() === ADMIN_EMAIL
      ) {
        setLoading(false);
        onSuccess();
      } else {
        setLoading(false);
        setError('Invalid admin credentials. Try: name = admin, email = admin@gamingx.com');
      }
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[90] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-[#080810] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-[0_0_60px_rgba(176,38,255,0.2)] relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
              <h2 className="text-xl font-cyber font-bold flex items-center gap-3 text-[#b026ff]">
                <Lock className="w-5 h-5" /> ADMIN ACCESS
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleLogin} className="p-8 space-y-5">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-[#b026ff]/10 border border-[#b026ff]/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(176,38,255,0.2)]">
                  <LayoutDashboard className="w-10 h-10 text-[#b026ff]" />
                </div>
                <p className="text-gray-400 text-sm">Enter your admin credentials to access the dashboard.</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Admin Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="admin"
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#b026ff] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@gamingx.com"
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#b026ff] transition-colors"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#ff0055] text-xs bg-[#ff0055]/10 border border-[#ff0055]/30 rounded-xl px-4 py-3"
                >
                  ⚠️ {error}
                </motion.p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-2 bg-gradient-to-r from-[#b026ff] to-[#6b21a8] hover:from-[#9c1ce6] hover:to-[#581c87] text-white font-bold rounded-xl tracking-[0.2em] uppercase transition-all shadow-[0_0_20px_rgba(176,38,255,0.3)] hover:shadow-[0_0_35px_rgba(176,38,255,0.5)] disabled:opacity-50"
              >
                {loading ? '⏳ Verifying...' : '🔐 ACCESS DASHBOARD'}
              </button>

              <p className="text-center text-xs text-gray-600 mt-2">
                Demo: name = <span className="text-[#b026ff]">admin</span> | email = <span className="text-[#b026ff]">admin@gamingx.com</span>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminLoginModal;
