import { cn } from '../../utils/classNames.js';

export function Section({ id, title, action, className = '', children }) {
  return (
    <section id={id} className={cn('flex min-w-0 scroll-mt-24 flex-col gap-8', className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <h2 className="font-serif text-[clamp(2.1rem,4vw,2.9rem)] leading-[1.05] tracking-[-0.01em] text-text-primary">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
