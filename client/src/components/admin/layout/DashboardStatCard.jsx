import { Link } from 'react-router-dom';

export function DashboardStatCard({ label, value, icon, to }) {
  const Wrapper = to ? Link : 'div';

  return (
    <Wrapper to={to} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-glow transition-transform hover:-translate-y-1">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-2xl">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </Wrapper>
  );
}
