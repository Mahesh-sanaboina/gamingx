import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="card-glass mx-auto max-w-3xl rounded-[32px] p-10 text-center text-slate-300">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">404 error</p>
      <h1 className="mt-4 text-5xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 text-slate-400">The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn-primary mt-8 inline-flex">
        Return home
      </Link>
    </div>
  );
};

export default NotFound;
