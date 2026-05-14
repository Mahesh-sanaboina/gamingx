import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getProducts } from '../services/productService';
import Loader from '../components/Loader';
import { trackEvent } from '../utils/analytics';

const categories = ['PC', 'GPU', 'Keyboard', 'Mouse', 'Monitor', 'Headset'];

const SetupPlanner = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('PC');
  const [setup, setSetup] = useState({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('gamingx_setup');
    if (stored) {
      setSetup(JSON.parse(stored));
    }
  }, []);

  const categoryItems = useMemo(
    () => products.filter((product) => product.category.toLowerCase().includes(selectedCategory.toLowerCase())),
    [products, selectedCategory],
  );

  const handleSelect = (item) => {
    const next = { ...setup, [selectedCategory]: item };
    setSetup(next);
    localStorage.setItem('gamingx_setup', JSON.stringify(next));
    trackEvent('setup_item_selected', { category: selectedCategory, productId: item._id });
  };

  const handleSave = () => {
    if (!user) return;
    localStorage.setItem(`gamingx_setup_${user.id}`, JSON.stringify(setup));
    setSaved(true);
    trackEvent('setup_saved', { userId: user.id });
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <section className="space-y-10">
      <div className="glass-panel rounded-[36px] p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Setup planner</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Build your dream command center</h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Select premium hardware for each category and compose a gaming setup that feels like a true next-gen control deck.
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-8 xl:grid-cols-[0.8fr_0.6fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    selectedCategory === category
                      ? 'bg-cyan-400 text-slate-950 shadow-glow'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {categoryItems.length === 0 ? (
                <div className="card-glass rounded-[32px] p-6 text-slate-300">No matching setup products found.</div>
              ) : (
                categoryItems.map((product) => (
                  <div key={product._id} className="card-glass rounded-[32px] p-5">
                    <div className="flex items-center gap-4">
                      <img src={product.images?.[0]} alt={product.title} className="h-20 w-20 rounded-3xl object-cover" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{product.title}</h3>
                        <p className="text-sm text-slate-400">${product.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSelect(product)}
                      className="btn-primary mt-5 w-full"
                    >
                      Choose for {selectedCategory}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-panel rounded-[32px] p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Selected components</p>
            <div className="mt-6 space-y-4">
              {categories.map((category) => (
                <div key={category} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{category}</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {setup[category]?.title || `Choose a ${category}`}
                  </p>
                  {setup[category] ? <p className="text-sm text-slate-400">${setup[category].price}</p> : null}
                </div>
              ))}
            </div>
            <button
              onClick={handleSave}
              className="btn-secondary mt-8 w-full"
              disabled={!user}
            >
              {user ? 'Save setup to profile' : 'Login to save setup'}
            </button>
            {saved ? <p className="mt-4 text-sm text-emerald-300">Setup saved locally to your profile.</p> : null}
          </div>
        </div>
      )}
    </section>
  );
};

export default SetupPlanner;
