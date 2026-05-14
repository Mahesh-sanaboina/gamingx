import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, CheckCircle, Smartphone, Building2, Truck, Wallet } from 'lucide-react';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../store/useCart';

const paymentMethods = [
  { id: 'card',    label: 'Credit / Debit Card', icon: CreditCard,  color: '#00f0ff' },
  { id: 'upi',     label: 'UPI Payment',          icon: Smartphone,  color: '#b026ff' },
  { id: 'netbank', label: 'Net Banking',           icon: Building2,   color: '#ff9900' },
  { id: 'wallet',  label: 'Wallets',               icon: Wallet,      color: '#25D366' },
  { id: 'cod',     label: 'Cash on Delivery',      icon: Truck,       color: '#ff0055' },
];

const upiApps = [
  { name: 'Google Pay',  color: '#4285F4', emoji: '🔵' },
  { name: 'PhonePe',     color: '#6739B7', emoji: '🟣' },
  { name: 'Paytm',       color: '#00B9F1', emoji: '🔷' },
  { name: 'BHIM UPI',    color: '#FF6600', emoji: '🟠' },
];

const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'];

const wallets = [
  { name: 'Amazon Pay', emoji: '📦' },
  { name: 'Mobikwik',   emoji: '💙' },
  { name: 'Freecharge', emoji: '⚡' },
];

const CheckoutModal = () => {
  const { isCheckoutOpen, toggleCheckout, clearCart, cartItems } = useCartStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [activeMethod, setActiveMethod] = useState('card');
  const [selectedUpi, setSelectedUpi] = useState(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return sum + (price * item.quantity);
  }, 0);

  const steps = [
    "Establishing Secure Connection...",
    "Verifying Credentials...",
    "Authorizing Transaction...",
    "Finalizing Payment..."
  ];

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate realistic processing steps
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setProcessingStep(currentStep);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        // Final success state
        setIsSuccess(true);
        confetti({ 
          particleCount: 150, 
          spread: 80, 
          origin: { y: 0.6 }, 
          colors: ['#b026ff', '#00f0ff', '#ff0055', '#ffdd00'] 
        });
        
        // Remove auto-close, let user see success and click a button
        // clearCart(); // Keep cart for summary until they close
      }
    }, 1200);
  };

  const handleFinalClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    setProcessingStep(0);
    clearCart();
    toggleCheckout();
  };

  const renderPaymentForm = () => {
    switch (activeMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Cardholder Name</label>
              <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Card Number</label>
              <input required type="text" maxLength={19} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors font-mono" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Expiry</label>
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors font-mono" placeholder="MM/YY" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">CVV</label>
                <input required type="text" maxLength={3} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors font-mono" placeholder="•••" />
              </div>
            </div>
          </div>
        );

      case 'upi':
        return (
          <div className="space-y-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Select UPI App</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {upiApps.map(app => (
                <button key={app.name} type="button" onClick={() => setSelectedUpi(app.name)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${selectedUpi === app.name ? 'border-[#b026ff] bg-[#b026ff]/10 shadow-[0_0_15px_rgba(176,38,255,0.3)]' : 'border-white/10 bg-black/30 hover:border-white/30'}`}>
                  <span className="text-2xl">{app.emoji}</span>
                  <span className="text-sm font-bold text-white">{app.name}</span>
                </button>
              ))}
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Or Enter UPI ID</label>
              <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#b026ff] transition-colors font-mono" placeholder="yourname@upi" />
            </div>
          </div>
        );

      case 'netbank':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Select Your Bank</label>
              <select required value={selectedBank} onChange={e => setSelectedBank(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#ff9900] transition-colors">
                <option value="">-- Choose Bank --</option>
                {banks.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Customer ID / Username</label>
              <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#ff9900] transition-colors" placeholder="Enter your bank username" />
            </div>
            <div className="p-3 rounded-xl bg-[#ff9900]/10 border border-[#ff9900]/30 text-xs text-[#ff9900]">
              ⚠️ You will be redirected to your bank's secure portal to complete payment.
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Select Wallet</p>
            <div className="space-y-3">
              {wallets.map(w => (
                <button key={w.name} type="button" onClick={() => setSelectedWallet(w.name)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${selectedWallet === w.name ? 'border-[#25D366] bg-[#25D366]/10 shadow-[0_0_15px_rgba(37,211,102,0.3)]' : 'border-white/10 bg-black/30 hover:border-white/30'}`}>
                  <span className="text-2xl">{w.emoji}</span>
                  <span className="font-bold text-white">{w.name}</span>
                  {selectedWallet === w.name && <span className="ml-auto text-[#25D366] text-xs font-bold">✓ SELECTED</span>}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Registered Mobile Number</label>
              <input type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#25D366] transition-colors font-mono" placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
        );

      case 'cod':
        return (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-[#ff0055]/10 border border-[#ff0055]/30 text-center">
              <Truck className="w-12 h-12 text-[#ff0055] mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-2">Cash on Delivery</h4>
              <p className="text-gray-400 text-sm">Pay when your order arrives. Available for all locations. Delivery in 3-7 business days.</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Delivery Address</label>
              <textarea required rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#ff0055] transition-colors resize-none" placeholder="Enter your full delivery address..." />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Mobile Number</label>
              <input required type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#ff0055] transition-colors font-mono" placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
        );

      default: return null;
    }
  };

  const activeColor = paymentMethods.find(m => m.id === activeMethod)?.color || '#00f0ff';

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[80] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#080810] border border-white/10 rounded-3xl w-full max-w-3xl overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.1)] relative"
          >
            {isProcessing ? (
              <div className="p-20 flex flex-col items-center justify-center text-center bg-black/40">
                <div className="relative w-32 h-32 mb-10">
                  {/* Outer spinning ring */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-t-[#00f0ff] border-r-transparent border-b-[#b026ff] border-l-transparent rounded-full shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                  />
                  {/* Inner spinning ring (opposite direction) */}
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border-4 border-t-transparent border-r-[#b026ff] border-b-transparent border-l-[#00f0ff] rounded-full opacity-60"
                  />
                  {/* Center pulsing core */}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-10 bg-gradient-to-br from-[#00f0ff] to-[#b026ff] rounded-full blur-sm opacity-50"
                  />
                </div>

                <motion.h3 
                  key={processingStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-cyber font-bold mb-4 tracking-wider text-white"
                >
                  {steps[processingStep]}
                </motion.h3>
                
                <div className="w-full max-w-sm h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${((processingStep + 1) / steps.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-[#b026ff] to-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
                  />
                </div>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest animate-pulse">Encryption: AES-256 Active</p>
              </div>
            ) : isSuccess ? (
              <div className="p-12 flex flex-col items-center justify-center text-center bg-[#05050a]">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: "spring", damping: 10 }}
                  className="w-24 h-24 bg-gradient-to-br from-[#00f0ff]/20 to-[#b026ff]/20 rounded-full flex items-center justify-center mb-6 border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]"
                >
                  <CheckCircle className="w-12 h-12 text-[#00f0ff]" />
                </motion.div>
                
                <h2 className="text-3xl font-cyber font-bold mb-2 text-white tracking-widest">TRANSACTION COMPLETE</h2>
                <p className="text-gray-400 mb-8 max-w-sm">Your premium gear has been logged. An encrypted receipt has been dispatched to your terminal.</p>
                
                <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/10 mb-8 text-left">
                  <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                    <span className="text-xs uppercase text-gray-500 font-bold">Order Tracking ID</span>
                    <span className="text-[#00f0ff] font-mono text-sm tracking-tighter">GX-{Math.floor(Math.random()*900000)+100000}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-gray-400">Total Charged</span>
                    <span className="text-white font-bold font-mono">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Est. Arrival</span>
                    <span className="text-[#b026ff] font-bold">3-5 Business Days</span>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-3">
                  <button 
                    onClick={handleFinalClose}
                    className="w-full py-4 bg-gradient-to-r from-[#b026ff] to-[#00f0ff] text-white font-bold rounded-xl tracking-widest uppercase shadow-[0_0_20px_rgba(176,38,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-all"
                  >
                    Continue Shopping
                  </button>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleFinalClose(); }}
                    className="text-xs text-gray-500 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    Track Shipment in Dashboard →
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50">
                  <h2 className="text-2xl font-cyber font-bold flex items-center gap-3">
                    <CreditCard className="text-[#b026ff]" /> SECURE CHECKOUT
                  </h2>
                  <button onClick={toggleCheckout} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row max-h-[80vh] overflow-y-auto">
                  {/* Order Summary */}
                  <div className="p-6 lg:w-2/5 bg-white/5 border-b lg:border-b-0 lg:border-r border-white/5">
                    <h3 className="font-bold mb-4 text-gray-300 uppercase tracking-wider text-xs">Order Summary</h3>
                    <div className="space-y-3 mb-6 max-h-36 overflow-y-auto pr-2">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-400">{item.name} ×{item.quantity}</span>
                          <span className="text-white font-bold">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-between font-bold text-xl">
                      <span className="text-gray-300">Total Due</span>
                      <span className="text-[#00f0ff] drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                        ₹{total.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="mt-8">
                      <h3 className="font-bold mb-4 text-gray-300 uppercase tracking-wider text-xs">Payment Method</h3>
                      <div className="space-y-2">
                        {paymentMethods.map(method => {
                          const Icon = method.icon;
                          const isActive = activeMethod === method.id;
                          return (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => setActiveMethod(method.id)}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${isActive ? 'bg-white/5 border-white/20' : 'border-transparent hover:border-white/10 hover:bg-white/5'}`}
                            >
                              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: isActive ? method.color : '#6b7280' }} />
                              <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>{method.label}</span>
                              {isActive && <div className="ml-auto w-2 h-2 rounded-full" style={{ background: method.color, boxShadow: `0 0 8px ${method.color}` }}></div>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Payment Form */}
                  <form onSubmit={handlePayment} className="p-6 lg:w-3/5 flex flex-col">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Email Address</label>
                      <input required type="email" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors mb-5" placeholder="you@example.com" />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeMethod}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {renderPaymentForm()}
                      </motion.div>
                    </AnimatePresence>

                    <button
                      type="submit"
                      className="mt-6 w-full py-4 font-bold text-white rounded-xl tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)]"
                      style={{ background: `linear-gradient(135deg, #b026ff, ${activeColor})` }}
                    >
                      {activeMethod === 'cod' ? '📦 Confirm Order' : `💳 PAY ₹${total.toLocaleString('en-IN')}`}
                    </button>

                    <p className="text-center text-xs text-gray-600 mt-4">🔒 256-bit SSL encrypted & secure payment</p>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
