import { Section } from '../layout/Section.jsx';
import { ChipsSkeleton } from '../ui/Skeleton.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { optimizeImage } from '../../utils/optimizeImage.js';

function SkillChip({ skill }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border py-[5px] pl-1.5 pr-3 text-[0.93rem] font-medium text-text-primary">
      {skill.icon ? (
        <img src={optimizeImage(skill.icon, 48)} alt="" loading="lazy" decoding="async" className="h-6 w-6 rounded-full bg-white object-contain p-[3px]" />
      ) : (
        <span className="w-1" />
      )}
      {skill.name}
    </span>
  );
}

export function SkillsSection() {
  const { data, loading, error, refetch } = usePortfolioData('skills');
  const categories = (data || []).filter((category) => category.skills.length > 0);

  return (
    <Section id="skills" title="Skills">
      {loading && <ChipsSkeleton />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!loading && !error && categories.length === 0 && <EmptyState title="No skills yet" message="Skills will appear here once they are added." />}

      {categories.length > 0 && (
        <dl className="border-b border-border">
          {categories.map((category) => (
            <div key={category._id} className="grid gap-x-6 gap-y-2 border-t border-border py-[18px] lg:grid-cols-[250px_minmax(0,1fr)] lg:items-center">
              <dt className="text-[0.95rem] text-text-secondary">{category.title}</dt>
              <dd className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillChip key={skill._id} skill={skill} />
                ))}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Section>
  );
}
