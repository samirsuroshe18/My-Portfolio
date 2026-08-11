import { SectionHeader } from '../layout/SectionHeader.jsx';
import { EducationCard } from '../cards/EducationCard.jsx';
import { TimelineList } from '../ui/TimelineList.jsx';
import { Spinner } from '../ui/Spinner.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';

export function EducationSection() {
  const { data, loading, error, refetch } = usePortfolioData('education');

  return (
    <section id="education" className="mx-auto max-w-4xl px-5 py-20">
      <SectionHeader title="Education" description="My academic background." />

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!loading && !error && data?.length === 0 && (
        <EmptyState icon="🎓" title="No education listed yet" message="Academic history will show up here once added." />
      )}
      {!loading && !error && data?.length > 0 && (
        <TimelineList items={data} renderItem={(education) => <EducationCard education={education} />} />
      )}
    </section>
  );
}
