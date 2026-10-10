import { cn } from '../../utils/classNames.js';

export function LinkList({ links, accent = false, className = '' }) {
  if (!links?.length) return null;

  return (
    <div className={cn('flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem] font-semibold', className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'underline decoration-1 underline-offset-4 transition-colors',
            accent ? 'text-primary' : 'text-text-primary decoration-text-secondary hover:text-primary hover:decoration-primary'
          )}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
