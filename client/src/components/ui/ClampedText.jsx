import { useEffect, useRef, useState } from 'react';
import { ExpandableSummary } from '../cards/ProjectMore.jsx';
import { cn } from '../../utils/classNames.js';

const LINE_HEIGHT = 1.6;

/**
 * Text cut to a few lines with "Read more" at the end, and "Read less" once opened.
 * An invisible full copy is measured so the control only appears when the text really is longer.
 */
export function ClampedText({ text, lines = 2, className = '' }) {
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(true);
  const measure = useRef(null);

  useEffect(() => {
    const full = measure.current;
    if (!full) return;
    const update = () => {
      const lineHeight = parseFloat(getComputedStyle(full).lineHeight);
      setOverflows(full.offsetHeight > lineHeight * lines + 1);
    };
    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(full);
    return () => resizeObserver.disconnect();
  }, [lines, text]);

  if (!text) return null;

  return (
    <div className="relative">
      <p ref={measure} aria-hidden="true" className={cn('pointer-events-none invisible absolute inset-x-0 top-0', className)} style={{ lineHeight: LINE_HEIGHT }}>
        {text}
      </p>
      {open || !overflows ? (
        <p className={className} style={{ lineHeight: LINE_HEIGHT }}>
          {text}
          {open && (
            <button onClick={() => setOpen(false)} aria-expanded="true" className="ml-2 cursor-pointer text-primary hover:underline hover:underline-offset-4">
              Read less
            </button>
          )}
        </p>
      ) : (
        <ExpandableSummary text={text} lines={lines} open={false} onToggle={() => setOpen(true)} className={className} />
      )}
    </div>
  );
}
