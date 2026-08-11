import { Badge } from '../ui/Badge.jsx';
import { formatDateRange } from '../../utils/formatDate.js';

const PLATFORM_LABEL = { web: 'Web App', android: 'Mobile App', ios: 'Mobile App', desktop: 'Desktop App' };

export function ProjectCard({ project, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-glow transition-all hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="relative">
        <img src={project.image} alt={project.title} className="h-44 w-full object-cover transition-transform group-hover:scale-105" />
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
          {PLATFORM_LABEL[project.platform] || 'Project'}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap gap-1.5">
          {project.tags?.slice(0, 4).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h3 className="line-clamp-2 text-lg font-semibold text-text-primary">{project.title}</h3>
        <p className="text-xs text-text-secondary/80">{formatDateRange(project.startDate, project.endDate, false)}</p>
        <p className="line-clamp-3 text-sm text-text-secondary">{project.shortDescription || project.description}</p>
      </div>
    </button>
  );
}
