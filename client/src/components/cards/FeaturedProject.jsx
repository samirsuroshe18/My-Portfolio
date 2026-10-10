import { LinkList } from '../ui/LinkList.jsx';
import { formatDateRange } from '../../utils/formatDate.js';
import { optimizeImage } from '../../utils/optimizeImage.js';
import { kindLabel, projectLinks } from '../../utils/portfolio.js';

export function FeaturedProject({ project, onOpen }) {
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
        <h3>
          <button
            onClick={onOpen}
            className="cursor-pointer text-left font-serif text-[clamp(1.8rem,3vw,2.3rem)] leading-[1.08] text-text-primary transition-colors hover:text-primary"
          >
            {project.title}
          </button>
        </h3>
        <p className="line-clamp-4 max-w-[62ch] text-text-secondary">{project.shortDescription || project.description}</p>
        {project.highlights?.length > 0 && (
          <ul className="flex max-w-[60ch] list-disc flex-col gap-1 pl-[18px] text-[0.95rem] text-text-secondary">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}
        {project.techStack?.length > 0 && <p className="text-[0.93rem] text-text-secondary">{project.techStack.slice(0, 7).join(', ')}</p>}
        <LinkList links={projectLinks(project)} />
      </div>
    </article>
  );
}
