import { FaChevronDown } from 'react-icons/fa';
import { cn } from '../../utils/classNames.js';

/** A quiet text control that shares a line with other content instead of taking its own. */
export function MoreToggle({ open, onToggle, panelId }) {
  return (
    <button
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={panelId}
      className="inline-flex flex-none cursor-pointer items-center gap-1.5 text-[0.9rem] font-semibold text-text-secondary transition-colors hover:text-text-primary"
    >
      {open ? 'Less' : 'Details'}
      <FaChevronDown aria-hidden="true" className={cn('text-[0.62rem] transition-transform', open && 'rotate-180')} />
    </button>
  );
}

export function MorePanel({ id, highlights, fullDescription }) {
  return (
    <div id={id} className="flex flex-col gap-3 border-l-2 border-border pl-4">
      {highlights.length > 0 && (
        <ul className="flex max-w-[60ch] list-disc flex-col gap-1 pl-[18px] text-[0.95rem] text-text-secondary">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
      {fullDescription && <p className="max-w-[62ch] whitespace-pre-line text-[0.95rem] text-text-secondary">{fullDescription}</p>}
    </div>
  );
}
