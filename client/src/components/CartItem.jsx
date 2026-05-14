import { FaTrashAlt } from 'react-icons/fa';

const CartItem = ({ item, onUpdate, onRemove }) => {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/20 sm:flex-row sm:items-center">
      <img src={item.product.images?.[0]} alt={item.product.title} className="h-40 w-full max-w-[180px] rounded-3xl object-cover" />
      <div className="flex-1 space-y-3 text-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{item.product.title}</h3>
            <p className="text-sm text-slate-400">{item.product.category}</p>
          </div>
          <button className="rounded-2xl border border-rose-400/25 px-4 py-2 text-sm text-rose-300 transition hover:bg-rose-500/10" onClick={() => onRemove(item._id)}>
            <FaTrashAlt /> Remove
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="space-y-2">
            <p className="text-sm text-slate-400">Unit price</p>
            <p className="text-xl font-semibold text-cyan-300">${item.product.price}</p>
          </div>
          <div className="flex items-center gap-3 rounded-3xl border border-slate-700/80 bg-slate-900/80 px-3 py-2">
            <button className="text-xl" onClick={() => onUpdate(item._id, item.quantity - 1)}>-</button>
            <span className="min-w-[2rem] text-center text-base font-semibold">{item.quantity}</span>
            <button className="text-xl" onClick={() => onUpdate(item._id, item.quantity + 1)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
