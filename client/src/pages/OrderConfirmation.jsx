import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) {
    return (
      <div className="card-glass rounded-[32px] p-10 text-center text-slate-300">
        No order information available. Please return to the shop.
        <button className="btn-primary mt-6" onClick={() => navigate('/products')}>
          Browse products
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="card-glass rounded-[32px] p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Order confirmed</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Your transaction was successful</h1>
        <p className="mt-4 max-w-2xl mx-auto text-slate-300">
          Thank you for choosing GamingX. Your digital order ID is <span className="font-semibold text-white">{order.orderId}</span> and your rig will be prepared for delivery.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-[32px] p-6">
          <h2 className="text-2xl font-semibold text-white">Shipping info</h2>
          <p className="mt-4 text-slate-300">{order.shipping.fullName}</p>
          <p className="mt-1 text-slate-300">{order.shipping.address}</p>
          <p className="text-slate-300">{order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}</p>
          <p className="text-slate-300">{order.shipping.country}</p>
        </div>
        <div className="glass-panel rounded-[32px] p-6">
          <h2 className="text-2xl font-semibold text-white">Order summary</h2>
          <div className="mt-4 space-y-3 text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>${order.tax}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold text-white">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;
