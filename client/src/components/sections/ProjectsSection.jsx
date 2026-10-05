import { useMemo, useState } from 'react';
import { SectionHeader } from '../layout/SectionHeader.jsx';
import { ProjectCard } from '../cards/ProjectCard.jsx';
import { ProjectFilterTabs } from '../cards/ProjectFilterTabs.jsx';
import { ProjectDetailModal } from '../modals/ProjectDetailModal.jsx';
import { Button } from '../ui/Button.jsx';
import { Spinner } from '../ui/Spinner.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { mapProjectToModal } from '../../utils/mapToModalItem.js';

// How many projects a phone shows before the rest are asked for
const MOBILE_LIMIT = 6;

const TABS = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web Apps' },
  { value: 'android', label: 'Mobile Apps' },
];

export function ProjectsSection() {
  const { data, loading, error, refetch } = usePortfolioData('projects');
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (!data) return [];
    return filter === 'all' ? data : data.filter((project) => project.platform === filter);
  }, [data, filter]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader title="Projects" description="A selection of things I've built and shipped." />

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && data?.length === 0 && (
        <EmptyState icon="🗂️" title="No projects yet" message="Projects will appear here once added from the admin dashboard." />
      )}

      {!loading && !error && data?.length > 0 && (
        <>
          <div className="flex justify-center">
            <ProjectFilterTabs tabs={TABS} active={filter} onChange={setFilter} />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                onClick={() => setActiveProject(project)}
                hideOnMobile={index >= MOBILE_LIMIT && !showAll}
              />
            ))}
          </div>
          {filtered.length > MOBILE_LIMIT && !showAll && (
            <div className="mt-8 flex justify-center sm:hidden">
              <Button variant="outline" onClick={() => setShowAll(true)}>
                Show all {filtered.length} projects
              </Button>
            </div>
          )}
        </>
      )}

      <ProjectDetailModal item={activeProject ? mapProjectToModal(activeProject) : null} onClose={() => setActiveProject(null)} />
    </section>
  );
}
