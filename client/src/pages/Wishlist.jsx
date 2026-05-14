import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { removeWishlistItem } from '../services/authService';

const Wishlist = () => {
  const { wishlist, refreshWishlist } = useCart();
  const [removing, setRemoving] = useState(null);

  const handleRemove = async (productId) => {
    setRemoving(productId);
    try {
      await removeWishlistItem(productId);
      await refreshWishlist();
    } catch (error) {
      console.error(error);
    } finally {
      setRemoving(null);
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Wishlist</p>
          <h1 className="text-4xl font-semibold text-white">Saved gear for your next build</h1>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="card-glass rounded-[32px] p-10 text-center text-slate-300">
          Your wishlist is empty. Add items from the product catalog to prepare your future loadout.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {wishlist.map((product) => (
            <div key={product._id} className="card-glass rounded-[32px] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <img src={product.images?.[0]} alt={product.title} className="h-36 w-full rounded-3xl object-cover sm:w-40" />
                <div className="flex-1 space-y-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">{product.title}</h2>
                    <p className="text-sm text-slate-400">{product.category}</p>
                  </div>
                  <p className="text-slate-300">{product.description}</p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-lg font-semibold text-cyan-300">${product.price}</span>
                    <button
                      className="btn-secondary"
                      onClick={() => handleRemove(product._id)}
                      disabled={removing === product._id}
                    >
                      {removing === product._id ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
