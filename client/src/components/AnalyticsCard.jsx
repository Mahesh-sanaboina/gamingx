const AnalyticsCard = ({ label, value, details }) => {
  return (
    <div className="card-glass rounded-[32px] p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-4 text-4xl font-semibold text-cyan-300">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{details}</p>
    </div>
  );
};

export default AnalyticsCard;
