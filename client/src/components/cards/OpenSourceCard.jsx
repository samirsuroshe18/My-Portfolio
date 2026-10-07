import { Badge } from '../ui/Badge.jsx';
import { formatDate } from '../../utils/formatDate.js';
import { optimizeImage } from '../../utils/optimizeImage.js';

export function OpenSourceCard({ contribution, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-glow transition-all hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="relative">
        {contribution.image && (
          <img src={optimizeImage(contribution.image, 800)} alt={contribution.title} loading="lazy" decoding="async" className="h-44 w-full object-cover transition-transform group-hover:scale-105" />
        )}
        <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
          Open Source
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap gap-1.5">
          {contribution.tags?.slice(0, 4).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h3 className="line-clamp-2 text-lg font-semibold text-text-primary">{contribution.title}</h3>
        <p className="text-sm font-medium text-text-secondary">{contribution.projectName}</p>
        <p className="text-xs text-text-secondary/80">
          {formatDate(contribution.date)} • {contribution.status}
        </p>
        <p className="line-clamp-3 text-sm text-text-secondary">{contribution.description}</p>
      </div>
    </button>
  );
}
