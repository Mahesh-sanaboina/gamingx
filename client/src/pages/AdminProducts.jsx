import { useEffect, useState } from 'react';
import { createProduct, deleteProduct, getAdminProducts, updateProduct } from '../services/productService';

const initialForm = {
  title: '',
  slug: '',
  category: '',
  price: 0,
  stock: 0,
  description: '',
  images: '',
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    const data = await getAdminProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, images: form.images.split(',').map((url) => url.trim()).filter(Boolean) };
      if (selected) {
        await updateProduct(selected._id, payload);
      } else {
        await createProduct(payload);
      }
      setForm(initialForm);
      setSelected(null);
      await loadProducts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelected(product);
    setForm({
      title: product.title,
      slug: product.slug,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      images: product.images.join(', '),
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-[32px] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Product management</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Approve and update inventory</h1>
      </div>
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="card-glass rounded-[32px] p-8">
          <h2 className="text-2xl font-semibold text-white">Create or edit product</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {[
              { name: 'title', label: 'Title' },
              { name: 'slug', label: 'Slug' },
              { name: 'category', label: 'Category' },
              { name: 'price', label: 'Price', type: 'number' },
              { name: 'stock', label: 'Stock', type: 'number' },
            ].map((field) => (
              <div key={field.name}>
                <label className="mb-2 block text-sm text-slate-400">{field.label}</label>
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div>
              <label className="mb-2 block text-sm text-slate-400">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="4" required />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-400">Images (comma separated URLs)</label>
              <input name="images" value={form.images} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {selected ? (loading ? 'Updating...' : 'Update product') : loading ? 'Creating...' : 'Create product'}
            </button>
          </form>
        </div>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product._id} className="card-glass rounded-[32px] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{product.title}</h3>
                  <p className="text-sm text-slate-400">{product.category}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="btn-secondary" onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                  <button className="btn-secondary" onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
