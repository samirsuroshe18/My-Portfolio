import { useId, useState } from 'react';
import { LinkList } from '../ui/LinkList.jsx';
import { TechTags } from '../ui/TechTags.jsx';
import { MorePanel, MoreToggle } from './ProjectMore.jsx';
import { cn } from '../../utils/classNames.js';
import { formatDateRange } from '../../utils/formatDate.js';
import { optimizeImage } from '../../utils/optimizeImage.js';
import { kindLabel, projectExtras, projectLinks } from '../../utils/portfolio.js';

export function FeaturedProject({ project }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { summary, fullDescription, highlights, hasMore } = projectExtras(project);
  const meta = [kindLabel(project.platform), formatDateRange(project.startDate, project.endDate, false)].filter(Boolean).join(', ');

  return (
    <article className="grid gap-x-14 gap-y-6 sm:grid-cols-[6fr_5fr] sm:items-center sm:[&:nth-child(even)>img]:order-2">
      {project.image && (
        <img
          src={optimizeImage(project.image, 1200)}
          alt={`${project.title} screenshot`}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full rounded-[14px] border border-border bg-skeleton object-cover"
        />
      )}
      <div className="flex min-w-0 flex-col gap-3">
        <p className="text-sm tabular-nums text-text-secondary">{meta}</p>
        <h3 className="font-serif text-[clamp(1.8rem,3vw,2.3rem)] leading-[1.08] text-text-primary">{project.title}</h3>
        {/* shortened only while "Details" is there to open it in full */}
        <p className={cn('max-w-[62ch] text-text-secondary', hasMore && !open && 'line-clamp-4')}>{summary}</p>
        <TechTags items={project.techStack} limit={open ? undefined : 7} />
        {open && <MorePanel id={panelId} highlights={highlights} fullDescription={fullDescription} />}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <LinkList links={projectLinks(project)} />
          {hasMore && <MoreToggle open={open} onToggle={() => setOpen((value) => !value)} panelId={panelId} />}
        </div>
      </div>
    </article>
  );
}
