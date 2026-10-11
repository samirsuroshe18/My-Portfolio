import { cn } from '../../utils/classNames.js';
import { descriptionBlocks } from '../../utils/portfolio.js';

/** A long free-text description typeset as paragraphs, small headings and lists. */
export function Description({ text, className = '' }) {
  const blocks = descriptionBlocks(text);
  if (blocks.length === 0) return null;

  return (
    <div className={cn('flex max-w-[62ch] flex-col gap-3 text-text-secondary', className)}>
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <p key={index} className="mt-1 font-semibold text-text-primary">
              {block.text}
            </p>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={index} className="-mt-1 flex list-disc flex-col gap-1 pl-[18px]">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="whitespace-pre-line">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
