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
import { cn } from '../../utils/classNames.js';
import { partitionProjects, platformKind, projectRuns } from '../../utils/portfolio.js';

// How many of the compact projects a phone shows before the rest are asked for
const MOBILE_LIMIT = 3;

export function ProjectsSection() {
  const { data, loading, error, refetch } = usePortfolioData('projects');
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const { counts } = partitionProjects(data, filter);
  const visible = (data || []).filter((project) => filter === 'all' || platformKind(project.platform) === filter);
  const runs = projectRuns(visible);
  const compact = visible.filter((project) => !project.isFeatured);
  // on a phone, compact projects past the limit wait behind "Show all"
  const isHeldBack = (project) => !showAll && compact.indexOf(project) >= MOBILE_LIMIT;
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

      {runs.map((run) =>
        run.featured ? (
          <div key={run.items[0]._id} className="flex flex-col gap-12 sm:gap-14">
            {run.items.map((project) => (
              <FeaturedProject key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div key={run.items[0]._id} className={cn('grid gap-x-14 border-t border-border lg:grid-cols-2', run.items.every(isHeldBack) && 'max-sm:hidden')}>
            {run.items.map((project) => (
              <ProjectRow key={project._id} project={project} className={isHeldBack(project) ? 'max-sm:hidden' : ''} />
            ))}
          </div>
        )
      )}

      {compact.length > MOBILE_LIMIT && !showAll && (
        <div className="sm:hidden">
          <Button variant="outline" onClick={() => setShowAll(true)}>
            Show all {visible.length} projects
          </Button>
        </div>
      )}
    </Section>
  );
}
