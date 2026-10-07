import { formatDateRange } from '../../utils/formatDate.js';
import { optimizeImage } from '../../utils/optimizeImage.js';

export function EducationCard({ education }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-glow transition-transform hover:-translate-y-1">
      <div className="flex items-start gap-4">
        {education.institutionLogo && (
          <img
            src={optimizeImage(education.institutionLogo, 96)}
            loading="lazy"
            decoding="async"
            alt={education.school}
            className="h-12 w-12 rounded-lg bg-white object-contain p-1"
          />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary">{education.school}</h3>
          <p className="text-sm font-medium text-text-secondary">{education.degree}</p>
          <p className="text-xs text-text-secondary/80">
            {formatDateRange(education.startDate, education.endDate, education.isCurrent)}
          </p>
        </div>
      </div>

      {education.grade && (
        <p className="mt-3 text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">Grade: </span>
          {education.grade}
        </p>
      )}

      {education.description && <p className="mt-2 text-sm text-text-secondary">{education.description}</p>}
    </div>
  );
}
