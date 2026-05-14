const OrderCard = ({ order, onStatusChange }) => {
  return (
    <div className="card-glass rounded-[32px] p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">Order ID</p>
          <h3 className="text-xl font-semibold text-white">{order.orderId}</h3>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <span className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-300">{order.status}</span>
          <span className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-300">${order.total}</span>
          <span className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-300">{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {order.items.map((item) => (
          <div key={item.product} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/80 p-4">
            <img src={item.image} alt={item.title} className="h-16 w-16 rounded-3xl object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-cyan-300">${item.price}</p>
          </div>
        ))}
      </div>
      {onStatusChange ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button className="btn-primary" onClick={() => onStatusChange(order._id, 'shipped')}>
            Mark Shipped
          </button>
          <button className="btn-secondary" onClick={() => onStatusChange(order._id, 'delivered')}>
            Mark Delivered
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default OrderCard;
