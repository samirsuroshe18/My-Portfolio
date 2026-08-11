import { SectionHeader } from '../layout/SectionHeader.jsx';
import { SkillCategoryBlock } from '../cards/SkillCategoryBlock.jsx';
import { Spinner } from '../ui/Spinner.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';

export function SkillsSection() {
  const { data, loading, error, refetch } = usePortfolioData('skills');

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader title="Skills" description="Technologies and tools I use to bring ideas to life." />

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!loading && !error && (!data || data.length === 0) && (
        <EmptyState icon="🧰" title="No skills yet" message="Skills will appear here once added from the admin dashboard." />
      )}
      {!loading && !error && data?.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data
            .filter((category) => category.skills.length > 0)
            .map((category) => (
              <SkillCategoryBlock key={category._id} title={category.title} skills={category.skills} />
            ))}
        </div>
      )}
    </section>
  );
}
