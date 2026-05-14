import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById } from '../services/productService';
import { addWishlistItem } from '../services/authService';
import { useCart } from '../hooks/useCart';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addCartItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddWishlist = async () => {
    if (!product) return;
    await addWishlistItem(product._id);
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div className="text-center text-slate-300">Product not found.</div>;
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div whileHover={{ scale: 1.01 }} className="card-glass overflow-hidden rounded-[36px] p-6">
          <img src={product.images?.[0]} alt={product.title} className="w-full rounded-[28px] object-cover" />
          <div className="mt-5 space-y-4">
            <h1 className="text-4xl font-semibold text-white">{product.title}</h1>
            <p className="text-slate-400">{product.description}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-900/80 p-4 text-slate-200">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Category</p>
                <p className="mt-2 text-lg font-semibold text-white">{product.category}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4 text-slate-200">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Stock</p>
                <p className="mt-2 text-lg font-semibold text-white">{product.stock}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4 text-slate-200">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Price</p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">${product.price}</p>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="space-y-6">
          <div className="glass-panel rounded-[32px]">
            <h2 className="text-2xl font-semibold text-white">Quick actions</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                <span className="text-sm text-slate-400">Quantity</span>
                <div className="flex items-center gap-3 rounded-3xl border border-slate-700/80 bg-slate-950/80 px-3 py-2">
                  <button
                    className="text-xl"
                    onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
                  >
                    -
                  </button>
                  <span className="min-w-[2rem] text-center text-base font-semibold text-white">{quantity}</span>
                  <button
                    className="text-xl"
                    onClick={() => setQuantity((qty) => Math.min(product.stock, qty + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
              <button className="btn-primary w-full" onClick={() => addCartItem(product._id, quantity)}>
                Add to Cart
              </button>
              <button className="btn-secondary w-full" onClick={handleAddWishlist}>
                Add to Wishlist
              </button>
            </div>
          </div>
          <div className="glass-panel rounded-[32px] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Experience</p>
            <h3 className="mt-4 text-xl font-semibold text-white">A cyberpunk setup that performs.</h3>
            <p className="mt-3 text-slate-300">
              Rugged design, responsive controls, and premium lighting to match the next-level virtual battleground.
            </p>
            <button className="btn-secondary mt-6 w-full" onClick={() => navigate('/products')}>
              Explore More Gear
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
