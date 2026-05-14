const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 py-10 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">GamingX</p>
          <p className="max-w-sm text-sm text-slate-400">
            A premium cyberpunk gaming system for elite players, built with secure payments, community launchpads, and futuristic product worlds.
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Connect</p>
          <div className="space-y-2 text-sm text-slate-400">
            <a href="#" className="hover:text-white">Discord</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Newsletter</p>
          <p className="text-sm text-slate-400">Subscribe to the neon dispatch for drops and tournaments.</p>
          <div className="flex gap-3">
            <input type="email" placeholder="Enter email" className="w-full" />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} GamingX. Built for premium gaming ecosystems.
      </div>
    </footer>
  );
};

export default Footer;
