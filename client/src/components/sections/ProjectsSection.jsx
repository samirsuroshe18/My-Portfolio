import { useState } from 'react';
import { Section } from '../layout/Section.jsx';
import { FeaturedProject } from '../cards/FeaturedProject.jsx';
import { ProjectRow } from '../cards/ProjectRow.jsx';
import { ProjectFilterTabs } from '../cards/ProjectFilterTabs.jsx';
import { Button } from '../ui/Button.jsx';
import { FeaturedSkeleton } from '../ui/Skeleton.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { partitionProjects } from '../../utils/portfolio.js';

// How many of the compact projects a phone shows before the rest are asked for
const MOBILE_LIMIT = 3;

export function ProjectsSection() {
  const { data, loading, error, refetch } = usePortfolioData('projects');
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const { featured, rest, counts } = partitionProjects(data, filter);
  const tabs = [
    { value: 'all', label: `All ${counts.all}` },
    { value: 'mobile', label: `Mobile ${counts.mobile}` },
    { value: 'web', label: `Web ${counts.web}` },
  ].filter((tab) => tab.value === 'all' || counts[tab.value] > 0);

  const changeFilter = (value) => {
    setFilter(value);
    setShowAll(false);
  };

  return (
    <Section
      id="projects"
      title="Selected work"
      action={counts.all > 0 && tabs.length > 1 && <ProjectFilterTabs tabs={tabs} active={filter} onChange={changeFilter} />}
    >
      {loading && <FeaturedSkeleton />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!loading && !error && counts.all === 0 && <EmptyState title="No projects yet" message="Projects will appear here once they are added." />}

      {featured.length > 0 && (
        <div className="flex flex-col gap-12 sm:gap-14">
          {featured.map((project) => (
            <FeaturedProject key={project._id} project={project} />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid gap-x-14 border-t border-border lg:grid-cols-2">
          {rest.map((project, index) => (
            <ProjectRow
              key={project._id}
              project={project}
              className={index >= MOBILE_LIMIT && !showAll ? 'max-sm:hidden' : ''}
            />
          ))}
        </div>
      )}

      {rest.length > MOBILE_LIMIT && !showAll && (
        <div className="sm:hidden">
          <Button variant="outline" onClick={() => setShowAll(true)}>
            Show all {featured.length + rest.length} projects
          </Button>
        </div>
      )}
    </Section>
  );
}
