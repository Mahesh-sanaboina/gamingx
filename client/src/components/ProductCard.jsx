import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { addWishlistItem } from '../services/authService';
import { trackEvent } from '../utils/analytics';

const ProductCard = ({ product }) => {
  const { addCartItem } = useCart();
  const { user } = useAuth();

  const handleWishlist = async () => {
    if (!user) {
      return;
    }
    await addWishlistItem(product._id);
    trackEvent('wishlist_add', { productId: product._id });
  };

  const rating = Number(product.rating) || 4.4;

  const handleAddCart = async () => {
    await addCartItem(product._id);
    trackEvent('add_to_cart', { productId: product._id, price: product.price });
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="card-glass overflow-hidden rounded-[32px] border border-white/10 p-5"
    >
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/60">
        <img src={product.images?.[0]} alt={product.title} className="h-60 w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-4 py-3 text-slate-100">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-xs text-slate-400">{product.category}</p>
        </div>
      </div>
      <div className="mt-5 space-y-4">
        <p className="text-sm leading-6 text-slate-300">{product.description}</p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-yellow-300">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar key={index} className={index < Math.round(rating) ? 'opacity-100' : 'opacity-30'} />
            ))}
            <span className="text-xs text-slate-400">{rating.toFixed(1)}</span>
          </div>
          <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
            {product.stock} in stock
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xl font-semibold text-cyan-300">${product.price}</span>
          <button onClick={handleAddCart} className="btn-primary gap-2">
            <FaShoppingCart /> Add to cart
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <button onClick={handleWishlist} className="btn-secondary inline-flex items-center gap-2">
            <FaHeart /> Wishlist
          </button>
          <Link to={`/products/${product._id}`} className="text-sm text-slate-300 hover:text-cyan-300" onClick={() => trackEvent('product_view', { productId: product._id })}>
            View details →
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
