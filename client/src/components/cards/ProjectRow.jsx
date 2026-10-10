import { LinkList } from '../ui/LinkList.jsx';
import { cn } from '../../utils/classNames.js';
import { formatDateRange } from '../../utils/formatDate.js';
import { optimizeImage } from '../../utils/optimizeImage.js';
import { kindLabel, projectLinks } from '../../utils/portfolio.js';

export function ProjectRow({ project, onOpen, className = '' }) {
  const facts = [kindLabel(project.platform), formatDateRange(project.startDate, project.endDate, false)].filter(Boolean).join(', ');
  const tech = project.techStack?.slice(0, 5).join(', ');

  return (
    <article className={cn('gap-3.5 border-b border-border py-6 sm:gap-5', project.image ? 'grid grid-cols-[76px_minmax(0,1fr)] sm:grid-cols-[112px_minmax(0,1fr)]' : 'block', className)}>
      {project.image && (
        <img
          src={optimizeImage(project.image, 240)}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-square w-full rounded-[10px] border border-border bg-skeleton object-cover"
        />
      )}
      <div className="flex min-w-0 flex-col gap-1.5">
        <h3>
          <button onClick={onOpen} className="cursor-pointer text-left text-[1.14rem] font-semibold leading-snug text-text-primary transition-colors hover:text-primary">
            {project.title}
          </button>
        </h3>
        <p className="line-clamp-3 text-[0.96rem] text-text-secondary">{project.shortDescription || project.description}</p>
        <p className="text-[0.93rem] text-text-secondary">{[facts, tech].filter(Boolean).join('. ')}</p>
        <LinkList links={projectLinks(project)} />
      </div>
    </article>
  );
}
