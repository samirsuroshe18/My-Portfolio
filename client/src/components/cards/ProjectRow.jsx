import { useId, useState } from 'react';
import { LinkList } from '../ui/LinkList.jsx';
import { TechTags } from '../ui/TechTags.jsx';
import { MorePanel, MoreToggle } from './ProjectMore.jsx';
import { cn } from '../../utils/classNames.js';
import { formatDateRange } from '../../utils/formatDate.js';
import { optimizeImage } from '../../utils/optimizeImage.js';
import { kindLabel, projectExtras, projectLinks } from '../../utils/portfolio.js';

export function ProjectRow({ project, className = '' }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { summary, fullDescription, highlights, hasMore } = projectExtras(project);
  const facts = [kindLabel(project.platform), formatDateRange(project.startDate, project.endDate, false)].filter(Boolean).join(', ');

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
      <div className="flex min-w-0 flex-col gap-2">
        <div>
          <h3 className="text-[1.14rem] font-semibold leading-snug text-text-primary">{project.title}</h3>
          {/* the details control shares the date line, so it adds no height to the row */}
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[0.9rem] tabular-nums text-text-secondary">{facts}</p>
            {hasMore && <MoreToggle open={open} onToggle={() => setOpen((value) => !value)} panelId={panelId} />}
          </div>
        </div>
        <p className="line-clamp-3 text-[0.96rem] text-text-secondary">{summary}</p>
        <TechTags items={project.techStack} limit={open ? undefined : 5} />
        {open && <MorePanel id={panelId} highlights={highlights} fullDescription={fullDescription} />}
        <LinkList links={projectLinks(project)} />
      </div>
    </article>
  );
}
