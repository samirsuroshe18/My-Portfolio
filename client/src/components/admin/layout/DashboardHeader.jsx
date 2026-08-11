import { ThemeToggle } from '../../layout/ThemeToggle.jsx';

export function DashboardHeader({ title, onMenuClick, actions }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-card px-5 py-4">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="text-xl text-text-primary lg:hidden" aria-label="Toggle sidebar">
          ☰
        </button>
        <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <ThemeToggle />
      </div>
    </header>
  );
}
