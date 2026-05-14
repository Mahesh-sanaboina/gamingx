import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, CheckCircle, Smartphone, Building2, Truck, Wallet, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  
  // UI States
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [activeMethod, setActiveMethod] = useState('card');
  
  // Form States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    upiId: '',
    bank: '',
    wallet: ''
  });

  const [errors, setErrors] = useState({});

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return sum + (price * item.quantity);
  }, 0);

  const steps = [
    "Processing your payment...",
    "Securely verifying transaction...",
    "Please wait while we confirm your payment...",
    "Checking payment gateway response..."
  ];

  const validateForm = () => {
    let newErrors = {};
    
    // Global Fields
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email is required";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Valid 10-digit phone number is required";
    if (!formData.address.trim()) newErrors.address = "Delivery address is required";

    // Method Specific Fields
    if (activeMethod === 'card') {
      if (!formData.cardNumber.match(/^\d{16,19}$/)) newErrors.cardNumber = "Enter valid card number";
      if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expiry = "Use MM/YY format";
      if (!formData.cvv.match(/^\d{3}$/)) newErrors.cvv = "CVV must be 3 digits";
    }

    if (activeMethod === 'upi' && !formData.upiId.includes('@')) {
      newErrors.upiId = "Enter a valid UPI ID";
    }

    if (activeMethod === 'netbank' && !formData.bank) {
      newErrors.bank = "Please select a bank";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setIsError(false);
    
    // Simulate realistic processing steps
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setProcessingStep(currentStep);
      } else {
        clearInterval(interval);
        
        // Random failure simulation (5% chance)
        const isSuccessful = Math.random() > 0.05;
        
        setIsProcessing(false);
        if (isSuccessful) {
          setIsSuccess(true);
          confetti({ 
            particleCount: 150, 
            spread: 80, 
            origin: { y: 0.6 }, 
            colors: ['#b026ff', '#00f0ff', '#ff0055', '#ffdd00'] 
          });
        } else {
          setIsError(true);
        }
      }
    }, 1500);
  };

  const handleFinalClose = () => {
    setIsSuccess(false);
    setIsError(false);
    setIsProcessing(false);
    setProcessingStep(0);
    if (isSuccess) clearCart();
    toggleCheckout();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const InputField = ({ label, name, placeholder, type = "text", maxLength, className = "" }) => (
    <div className={className}>
      <label className="block text-[10px] text-gray-500 mb-1 uppercase tracking-[0.15em] font-bold">{label}</label>
      <input
        name={name}
        type={type}
        maxLength={maxLength}
        value={formData[name]}
        onChange={handleInputChange}
        className={`w-full bg-black/40 border ${errors[name] ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-white/10'} rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] transition-all placeholder:text-gray-700`}
        placeholder={placeholder}
      />
      {errors[name] && <span className="text-[10px] text-red-500 mt-1 block font-medium">⚠️ {errors[name]}</span>}
    </div>
  );

  const renderPaymentForm = () => {
    switch (activeMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <InputField label="Card Number" name="cardNumber" placeholder="0000 0000 0000 0000" maxLength={19} />
            <div className="flex gap-4">
              <InputField label="Expiry Date" name="expiry" placeholder="MM/YY" maxLength={5} className="flex-1" />
              <InputField label="CVV" name="cvv" placeholder="•••" maxLength={3} type="password" className="flex-1" />
            </div>
          </div>
        );

      case 'upi':
        return (
          <div className="space-y-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Popular UPI Apps</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {upiApps.map(app => (
                <button key={app.name} type="button" onClick={() => setFormData(p => ({...p, upiId: app.name.toLowerCase() + '@upi'}))}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${formData.upiId.startsWith(app.name.toLowerCase()) ? 'border-[#b026ff] bg-[#b026ff]/10' : 'border-white/10 bg-black/30'}`}>
                  <span className="text-xl">{app.emoji}</span>
                  <span className="text-xs font-bold text-white">{app.name}</span>
                </button>
              ))}
            </div>
            <InputField label="UPI ID" name="upiId" placeholder="yourname@bank" />
          </div>
        );

      case 'netbank':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] text-gray-500 mb-1 uppercase tracking-widest font-bold">Select Bank</label>
              <select 
                name="bank"
                value={formData.bank}
                onChange={handleInputChange}
                className={`w-full bg-black/40 border ${errors.bank ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#ff9900] appearance-none`}
              >
                <option value="" className="bg-[#080810]">-- Select Bank --</option>
                {banks.map(b => <option key={b} value={b} className="bg-[#080810]">{b}</option>)}
              </select>
            </div>
            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 text-[11px] text-orange-400 flex gap-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>You will be redirected to the bank's secure site for authentication.</span>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-3">
            {wallets.map(w => (
              <button key={w.name} type="button" onClick={() => setFormData(p => ({...p, wallet: w.name}))}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${formData.wallet === w.name ? 'border-[#25D366] bg-[#25D366]/10' : 'border-white/10 bg-black/30'}`}>
                <span className="text-xl">{w.emoji}</span>
                <span className="font-bold text-white text-sm">{w.name}</span>
                {formData.wallet === w.name && <ShieldCheck className="ml-auto text-[#25D366] w-5 h-5" />}
              </button>
            ))}
          </div>
        );

      case 'cod':
        return (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Truck className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-white mb-2">Cash on Delivery</h4>
              <p className="text-gray-500 text-[11px]">Payment is required at the time of delivery. A verification call may be placed before shipping.</p>
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
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[80] flex items-center justify-center p-2 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="bg-[#080810] border border-white/10 rounded-2xl sm:rounded-[2.5rem] w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(0,0,0,0.8)] relative custom-scrollbar"
          >
            {isProcessing ? (
              <div className="p-8 sm:p-20 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="relative w-24 h-24 sm:w-40 sm:h-40 mb-8 sm:mb-12">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[4px] sm:border-[6px] border-t-[#00f0ff] border-r-transparent border-b-[#b026ff] border-l-transparent rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-white animate-spin opacity-20" />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff]/20 to-[#b026ff]/20 rounded-full blur-xl"
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={processingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-2 sm:space-y-4 px-4"
                  >
                    <h3 className="text-lg sm:text-2xl font-cyber font-bold tracking-widest text-white uppercase">{steps[processingStep]}</h3>
                    <p className="text-gray-500 font-mono text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase">PCI DSS Compliant Gateway Level 1</p>
                  </motion.div>
                </AnimatePresence>
                
                <div className="w-full max-w-xs sm:max-w-md h-1 bg-white/5 rounded-full overflow-hidden mt-8 sm:mt-12">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: `${((processingStep + 1) / steps.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-[#b026ff] to-[#00f0ff]"
                  />
                </div>
              </div>
            ) : isSuccess ? (
              <div className="p-10 sm:p-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                  <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-green-500" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-cyber font-bold mb-4 text-white uppercase tracking-widest">Payment Successful</h2>
                <p className="text-gray-400 mb-8 sm:mb-10 max-w-md text-sm sm:text-base">Your transaction has been verified. Order confirmation has been sent to your email.</p>
                <button 
                  onClick={handleFinalClose}
                  className="px-8 sm:px-12 py-3 sm:py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform text-xs sm:text-sm"
                >
                  Continue
                </button>
              </div>
            ) : isError ? (
              <div className="p-10 sm:p-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-red-500" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-cyber font-bold mb-4 text-white uppercase tracking-widest">Payment Failed</h2>
                <p className="text-gray-400 mb-8 sm:mb-10 max-w-md text-sm sm:text-base">Transaction could not be verified by your bank. Please check your details and try again.</p>
                <button 
                  onClick={() => { setIsError(false); setIsProcessing(false); }}
                  className="px-8 sm:px-12 py-3 sm:py-4 border-2 border-white/10 text-white font-black uppercase tracking-widest rounded-full hover:bg-white/5 transition-colors text-xs sm:text-sm"
                >
                  Retry Transaction
                </button>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row">
                {/* Left Side: Order & Summary */}
                <div className="lg:w-[40%] bg-white/[0.02] p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col">
                  <div className="flex items-center gap-4 mb-8 sm:mb-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#b026ff] to-[#00f0ff] p-[1px]">
                      <div className="w-full h-full bg-[#080810] rounded-xl sm:rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Secure Checkout</h2>
                      <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-widest">Order Summary</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 sm:space-y-6 max-h-[150px] lg:max-h-none overflow-y-auto pr-2 custom-scrollbar mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-black overflow-hidden border border-white/5">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[10px] sm:text-xs font-bold text-gray-200 truncate uppercase tracking-wider">{item.name}</h4>
                          <p className="text-[9px] sm:text-[10px] text-gray-500">Qty: {item.quantity}</p>
                          <p className="text-[10px] sm:text-xs font-mono text-[#00f0ff] mt-1">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/5 space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center text-gray-500 text-[10px] sm:text-xs">
                      <span>Subtotal</span>
                      <span className="font-mono">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-500 text-[10px] sm:text-xs">
                      <span>Shipping</span>
                      <span className="text-green-500 uppercase font-black text-[8px] sm:text-[9px] tracking-widest">Free</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest">Total Amount</span>
                      <span className="text-xl sm:text-2xl font-mono font-black text-white">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:w-[60%] p-6 sm:p-10 flex flex-col">
                  <div className="flex justify-between items-center mb-6 sm:mb-8">
                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                      {paymentMethods.map(m => {
                        const Icon = m.icon;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => { setActiveMethod(m.id); setErrors({}); }}
                            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all flex-shrink-0 ${activeMethod === m.id ? 'border-white/20 bg-white/5 text-white shadow-lg' : 'border-transparent text-gray-600 hover:text-gray-400'}`}
                          >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        );
                      })}
                    </div>
                    <button onClick={toggleCheckout} className="p-2 hover:bg-white/5 rounded-full text-gray-600 transition-colors flex-shrink-0">
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  <form onSubmit={handlePayment} className="flex-1 space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="Full Name" name="fullName" placeholder="Enter your full name" />
                      <InputField label="Email Address" name="email" placeholder="you@example.com" type="email" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="Phone Number" name="phone" placeholder="10-digit mobile number" maxLength={10} />
                      <InputField label="Delivery Address" name="address" placeholder="Full shipping address" />
                    </div>

                    <div className="pt-4 border-t border-white/5">
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
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] mt-auto"
                    >
                      Process Payment • ₹{total.toLocaleString('en-IN')}
                    </button>
                    
                    <div className="flex items-center justify-center gap-4 pt-4 opacity-30 grayscale hover:grayscale-0 transition-all">
                      <div className="h-[1px] flex-1 bg-white/10" />
                      <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-black text-white">SSL Encrypted</span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                    </div>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
