import { cn } from '../../utils/classNames.js';

const LINE_HEIGHT = 1.6;
const moreButton = 'cursor-pointer font-semibold text-text-primary underline decoration-text-secondary decoration-1 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary';

/**
 * A summary cut to a few lines with "Read more" at the end of the last line, the way chat apps do it.
 * The two floats do the placing: a spacer as tall as every line but the last pushes the button
 * down to the last visible line, and the text wraps around it. The flex wrapper is what lets the
 * spacer's percentage height resolve; the extra pixel keeps rounding from pulling the button
 * up into the line above.
 */
export function ExpandableSummary({ text, lines, open, onToggle, panelId, className = '' }) {
  if (open) return <p className={className}>{text}</p>;

  return (
    <div className="flex">
      <p className={cn('overflow-hidden', className)} style={{ lineHeight: LINE_HEIGHT, maxHeight: `${lines * LINE_HEIGHT}em` }}>
        <span aria-hidden="true" className="float-right" style={{ height: `calc(100% - ${LINE_HEIGHT}em + 1px)` }} />
        <button onClick={onToggle} aria-expanded="false" aria-controls={panelId} className={cn('float-right clear-both pl-1.5', moreButton)}>
          <span aria-hidden="true" className="font-normal text-text-secondary no-underline">… </span>
          Read more
        </button>
        {text}
      </p>
    </div>
  );
}

export function MorePanel({ id, highlights, fullDescription, onClose }) {
  return (
    <div id={id} className="flex flex-col items-start gap-3">
      {highlights.length > 0 && (
        <ul className="flex max-w-[60ch] list-disc flex-col gap-1 pl-[18px] text-[0.95rem] text-text-secondary">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
      {fullDescription && <p className="max-w-[62ch] whitespace-pre-line text-[0.95rem] text-text-secondary">{fullDescription}</p>}
      <button onClick={onClose} aria-expanded="true" aria-controls={id} className={cn('text-[0.95rem]', moreButton)}>
        Read less
      </button>
    </div>
  );
}
