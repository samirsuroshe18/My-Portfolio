import { SectionHeader } from '../layout/SectionHeader.jsx';
import { ExperienceCard } from '../cards/ExperienceCard.jsx';
import { TimelineList } from '../ui/TimelineList.jsx';
import { Spinner } from '../ui/Spinner.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';

export function ExperienceSection() {
  const { data, loading, error, refetch } = usePortfolioData('experience');

  return (
    <section id="experience" className="mx-auto max-w-4xl px-5 py-20">
      <SectionHeader title="Experience" description="Where I've worked and what I've built." />

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!loading && !error && data?.length === 0 && (
        <EmptyState icon="💼" title="No experience listed yet" message="Work history will show up here once added." />
      )}
      {!loading && !error && data?.length > 0 && (
        <TimelineList items={data} renderItem={(experience) => <ExperienceCard experience={experience} />} />
      )}
    </section>
  );
}
