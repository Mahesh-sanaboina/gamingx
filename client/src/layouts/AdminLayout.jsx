import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Products', path: '/admin/products' },
  { label: 'Orders', path: '/admin/orders' },
];

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm text-cyan-300">Admin Dashboard</p>
            <h1 className="text-2xl font-semibold text-white">GamingX Control Center</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-slate-900/90 px-4 py-2 text-sm text-slate-300">{user?.name}</span>
            <button className="btn-secondary" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav className="w-full max-w-[260px] space-y-3 rounded-[28px] border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-slate-950/40">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Management</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive ? 'bg-slate-900 text-cyan-300 shadow-glow' : 'text-slate-300 hover:bg-white/5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <section className="flex-1">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
