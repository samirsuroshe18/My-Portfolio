import { cn } from '../../utils/classNames.js';

export function Badge({ children, color = 'primary', className = '' }) {
  const colorClasses =
    color === 'primary'
      ? 'bg-primary/15 text-primary'
      : color === 'success'
        ? 'bg-emerald-500/15 text-emerald-500'
        : color === 'info'
          ? 'bg-blue-500/15 text-blue-400'
          : color === 'warning'
            ? 'bg-amber-500/15 text-amber-500'
            : 'bg-text-secondary/15 text-text-secondary';

  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', colorClasses, className)}>
      {children}
    </span>
  );
}
