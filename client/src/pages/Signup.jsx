import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signup(form);
      window.gtag?.('event', 'sign_up');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl space-y-8">
      <div className="glass-panel rounded-[32px] p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Create account</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Join the future of gaming</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
        <div>
          <label className="mb-2 block text-sm text-slate-400">Full name</label>
          <input name="name" value={form.name} onChange={handleChange} type="text" required placeholder="Your name" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-400">Email</label>
          <input name="email" value={form.email} onChange={handleChange} type="email" required placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-400">Password</label>
          <input name="password" value={form.password} onChange={handleChange} type="password" required placeholder="Enter your password" />
        </div>
        {error ? <p className="text-sm text-rose-400">{error}</p> : null}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        <p className="text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-300 hover:text-white">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
