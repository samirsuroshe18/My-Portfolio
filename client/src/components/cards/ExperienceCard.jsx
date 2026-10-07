import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';
import { formatDateRange } from '../../utils/formatDate.js';
import { optimizeImage } from '../../utils/optimizeImage.js';

export function ExperienceCard({ experience }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-glow transition-transform hover:-translate-y-1">
      <div className="flex items-start gap-4">
        {experience.companyLogo && (
          <img src={optimizeImage(experience.companyLogo, 96)} alt={experience.company} loading="lazy" decoding="async" className="h-12 w-12 rounded-lg bg-white object-contain p-1" />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary">{experience.role}</h3>
          <p className="text-sm font-medium text-text-secondary">{experience.company}</p>
          <p className="text-xs text-text-secondary/80">
            {formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}
            {experience.location ? ` • ${experience.location}` : ''}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-text-secondary">{experience.description}</p>

      {experience.bulletPoints?.length > 0 && (
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-text-secondary">
          {experience.bulletPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      )}

      {experience.technologies?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      )}

      {experience.certificateUrl && (
        <Button as="a" href={experience.certificateUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" className="mt-4">
          View Certificate
        </Button>
      )}
    </div>
  );
}
