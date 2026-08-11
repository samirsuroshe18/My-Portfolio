import { useState } from 'react';
import { SectionHeader } from '../layout/SectionHeader.jsx';
import { HackathonCard } from '../cards/HackathonCard.jsx';
import { ProjectDetailModal } from '../modals/ProjectDetailModal.jsx';
import { Spinner } from '../ui/Spinner.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { mapHackathonToModal } from '../../utils/mapToModalItem.js';

export function HackathonsSection() {
  const { data, loading, error, refetch } = usePortfolioData('hackathons');
  const [active, setActive] = useState(null);

  if (!loading && !error && (!data || data.length === 0)) return null;

  return (
    <section id="hackathons" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader title="Hackathons & Achievements" description="Competitions and events I've participated in." />

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && data?.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <HackathonCard key={item._id} hackathon={item} onClick={() => setActive(item)} />
          ))}
        </div>
      )}

      <ProjectDetailModal item={active ? mapHackathonToModal(active) : null} onClose={() => setActive(null)} />
    </section>
  );
}
