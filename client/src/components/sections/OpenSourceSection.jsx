import { useState } from 'react';
import { SectionHeader } from '../layout/SectionHeader.jsx';
import { OpenSourceCard } from '../cards/OpenSourceCard.jsx';
import { ProjectDetailModal } from '../modals/ProjectDetailModal.jsx';
import { Spinner } from '../ui/Spinner.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { mapOpenSourceToModal } from '../../utils/mapToModalItem.js';

export function OpenSourceSection() {
  const { data, loading, error, refetch } = usePortfolioData('openSource');
  const [active, setActive] = useState(null);

  if (!loading && !error && (!data || data.length === 0)) return null;

  return (
    <section id="open-source" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader title="Open Source" description="Contributions I've made to projects outside my own." />

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && data?.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <OpenSourceCard key={item._id} contribution={item} onClick={() => setActive(item)} />
          ))}
        </div>
      )}

      <ProjectDetailModal item={active ? mapOpenSourceToModal(active) : null} onClose={() => setActive(null)} />
    </section>
  );
}
