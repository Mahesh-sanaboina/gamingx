import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../hooks/useCart';
import { createPaymentIntent, confirmOrder } from '../services/orderService';
import Loader from '../components/Loader';
import { trackEvent } from '../utils/analytics';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart } = useCart();
  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const items = useMemo(
    () =>
      cart.map((entry) => ({
        productId: entry.product._id,
        title: entry.product.title,
        price: entry.product.price,
        quantity: entry.quantity,
        image: entry.product.images?.[0],
      })),
    [cart],
  );

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart]);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    trackEvent('checkout_started', { total });
    setLoading(true);
    setError('');

    try {
      const payload = { shipping, items };
      const { clientSecret } = await createPaymentIntent(payload);
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setError('Unable to initialize payment form.');
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: shipping.fullName,
          },
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed. Please try again.');
        setLoading(false);
        return;
      }

      if (result.paymentIntent?.status === 'succeeded') {
        trackEvent('payment_success', { amount: total });
        const order = await confirmOrder({
          paymentIntentId: result.paymentIntent.id,
          shipping,
          items,
        });
        navigate('/order-confirmation', { state: { order } });
      }
    } catch (err) {
      trackEvent('payment_failed', { error: err.message });
      setError(err.message || 'Unable to complete checkout.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return <div className="text-center text-slate-300">Your cart is empty. Add items before checking out.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="glass-panel rounded-[32px]">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Shipping details</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Full name', name: 'fullName' },
            { label: 'Address', name: 'address', full: true },
            { label: 'City', name: 'city' },
            { label: 'State', name: 'state' },
            { label: 'Postal code', name: 'postalCode' },
            { label: 'Country', name: 'country' },
          ].map((field) => (
            <div key={field.name} className={field.full ? 'col-span-2' : ''}>
              <label className="mb-2 block text-sm text-slate-400">{field.label}</label>
              <input
                required
                value={shipping[field.name]}
                onChange={(e) => setShipping((prev) => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full"
                placeholder={field.label}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Secure payment</p>
          <div className="mt-4 rounded-3xl border border-white/10 bg-slate-900/90 p-4">
            <CardElement options={{ style: { base: { color: '#f8fafc', fontSize: '16px', '::placeholder': { color: '#94a3b8' } }, invalid: { color: '#fb7185' } } }} />
          </div>
          <p className="mt-3 text-sm text-slate-400">Use test card 4242 4242 4242 4242 to complete payment.</p>
        </div>
      </div>
      <aside className="space-y-6">
        <div className="glass-panel rounded-[32px] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Order summary</p>
          <div className="mt-6 space-y-3 text-slate-300">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxes</span>
              <span>${tax}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold text-white">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
          <button type="submit" disabled={loading || !stripe} className="btn-primary mt-8 w-full">
            {loading ? 'Processing...' : 'Confirm payment'}
          </button>
          {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}
        </div>
        <div className="glass-panel rounded-[32px] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Billing details</p>
          <div className="mt-4 space-y-3 text-slate-300">
            {items.slice(0, 3).map((item) => (
              <div key={item.productId} className="flex items-center justify-between">
                <span>{item.title}</span>
                <span className="font-semibold text-cyan-300">x{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </form>
  );
};

const Checkout = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Checkout</p>
          <h1 className="text-4xl font-semibold text-white">Secure payment gateway</h1>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          Complete your order with Stripe and keep your gear request safe with tokenized payments.
        </p>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </section>
  );
};

export default Checkout;
