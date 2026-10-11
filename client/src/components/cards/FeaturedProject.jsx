import { useId, useState } from 'react';
import { LinkList } from '../ui/LinkList.jsx';
import { TechTags } from '../ui/TechTags.jsx';
import { ExpandableSummary, MorePanel } from './ProjectMore.jsx';
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
        {hasMore ? (
          <ExpandableSummary text={summary} lines={3} open={open} onToggle={() => setOpen(true)} panelId={panelId} className="max-w-[62ch] text-text-secondary" />
        ) : (
          <p className="max-w-[62ch] text-text-secondary">{summary}</p>
        )}
        <TechTags items={project.techStack} limit={open ? undefined : 7} />
        {open && <MorePanel id={panelId} highlights={highlights} fullDescription={fullDescription} onClose={() => setOpen(false)} />}
        <LinkList links={projectLinks(project)} />
      </div>
    </article>
  );
}
