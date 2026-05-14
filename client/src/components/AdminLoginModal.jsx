import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutDashboard, Lock, User, Mail } from 'lucide-react';

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
        setError('Invalid admin credentials.');
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
          className="fixed inset-0 bg-white/40 backdrop-blur-2xl z-[90] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="bg-white border border-white/80 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.1)] relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-black/5 bg-white/40">
              <h2 className="text-xl font-black flex items-center gap-3 text-[#1a1a2e] uppercase tracking-widest">
                <Lock className="w-5 h-5 text-[#b026ff]" /> COMMAND ACCESS
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleLogin} className="p-10 space-y-6">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-3xl bg-white/60 border border-white/80 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <LayoutDashboard className="w-10 h-10 text-[#b026ff]" />
                </div>
                <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Identify your node to proceed.</p>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 mb-2 uppercase tracking-[0.2em] font-black">Node Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="admin"
                    className="w-full bg-white/50 border border-black/5 rounded-2xl pl-12 pr-4 py-4 text-[#1a1a2e] text-sm focus:outline-none focus:border-[#b026ff] transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 mb-2 uppercase tracking-[0.2em] font-black">Secure Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@gamingx.com"
                    className="w-full bg-white/50 border border-black/5 rounded-2xl pl-12 pr-4 py-4 text-[#1a1a2e] text-sm focus:outline-none focus:border-[#b026ff] transition-all shadow-sm"
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#ff0055] text-[10px] font-black uppercase tracking-widest bg-[#ff0055]/5 border border-[#ff0055]/20 rounded-xl px-4 py-4 text-center"
                >
                  ⚠️ {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 mt-4 bg-[#1a1a2e] text-white font-black rounded-2xl tracking-[0.3em] uppercase transition-all shadow-xl hover:bg-[#b026ff] disabled:opacity-50 text-[10px]"
              >
                {loading ? '⌛ VERIFYING...' : '🔐 ACCESS HUB'}
              </button>

              <div className="text-center pt-4 opacity-30 grayscale hover:grayscale-0 transition-all">
                 <span className="text-[7px] uppercase tracking-[0.5em] font-black text-[#1a1a2e]">SSL Command Protocol</span>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminLoginModal;
