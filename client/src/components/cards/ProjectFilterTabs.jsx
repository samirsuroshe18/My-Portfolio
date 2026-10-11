import { cn } from '../../utils/classNames.js';

export function ProjectFilterTabs({ tabs, active, onChange }) {
  return (
    <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          aria-pressed={active === tab.value}
          className={cn(
            'cursor-pointer rounded-lg border px-3.5 py-1.5 text-[0.93rem] font-semibold transition-colors',
            active === tab.value ? 'border-border bg-card text-text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
