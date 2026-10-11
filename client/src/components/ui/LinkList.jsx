import { FaArrowUpRightFromSquare, FaAward, FaCirclePlay, FaCodePullRequest, FaDownload, FaGithub, FaGooglePlay } from 'react-icons/fa6';
import { cn } from '../../utils/classNames.js';

const ICONS = {
  store: FaGooglePlay,
  live: FaArrowUpRightFromSquare,
  apk: FaDownload,
  code: FaGithub,
  github: FaGithub,
  demo: FaCirclePlay,
  certificate: FaAward,
  pr: FaCodePullRequest,
};

/** A row of outbound links. A link with a known `kind` gets its icon in front of the label. */
export function LinkList({ links, accent = false, className = '' }) {
  if (!links?.length) return null;

  return (
    <div className={cn('flex flex-wrap gap-x-5 gap-y-1.5 text-[0.95rem] font-semibold', className)}>
      {links.map((link) => {
        const Icon = ICONS[link.kind];
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('group inline-flex items-center gap-1.5 transition-colors', accent ? 'text-primary' : 'text-text-primary hover:text-primary')}
          >
            {Icon && (
              <Icon aria-hidden="true" className={cn('flex-none text-[0.85em] transition-colors', accent ? 'text-primary' : 'text-text-secondary group-hover:text-primary')} />
            )}
            <span className={cn('underline decoration-1 underline-offset-4', !accent && 'decoration-text-secondary group-hover:decoration-primary')}>{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}
