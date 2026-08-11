import { cn } from '../../utils/classNames.js';

export function ProjectFilterTabs({ tabs, active, onChange }) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2 rounded-full border border-border bg-card p-1.5 sm:inline-flex sm:gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            active === tab.value ? 'bg-primary text-white shadow-glow' : 'text-text-secondary hover:text-primary'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
