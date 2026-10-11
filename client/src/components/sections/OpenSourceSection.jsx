import { useState } from 'react';
import { Section } from '../layout/Section.jsx';
import { ClampedText } from '../ui/ClampedText.jsx';
import { LinkList } from '../ui/LinkList.jsx';
import { TechTags } from '../ui/TechTags.jsx';
import { ProjectDetailModal } from '../modals/ProjectDetailModal.jsx';
import { RowsSkeleton } from '../ui/Skeleton.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { cn } from '../../utils/classNames.js';
import { formatMonthYear } from '../../utils/formatDate.js';
import { mapOpenSourceToModal } from '../../utils/mapToModalItem.js';
import { optimizeImage } from '../../utils/optimizeImage.js';
import { pullRequestRef } from '../../utils/portfolio.js';

function Contribution({ item, onOpen }) {
  const link = item.pullRequestUrl || item.repositoryUrl;
  const when = [formatMonthYear(item.date), item.release && `released in ${item.release}`].filter(Boolean).join(', ');

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border bg-card px-5 py-5 sm:px-7 sm:py-6">
      {/* phones: logo beside the title, then the status line across the full width, so nothing is
          indented under the logo; wider screens: the status line sits under the title */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3.5 gap-y-2.5 sm:gap-y-1.5">
        {/* the contribution's image is the organisation's logo */}
        {item.image && (
          <img
            src={optimizeImage(item.image, 112)}
            alt={`${item.projectName} logo`}
            loading="lazy"
            decoding="async"
            className="h-12 w-12 flex-none rounded-[10px] bg-white object-contain p-1 sm:row-span-2 sm:self-start"
          />
        )}
        <h3 className={item.image ? '' : 'col-span-2'}>
          <button
            onClick={onOpen}
            className="cursor-pointer text-left text-[1.14rem] font-semibold leading-snug text-text-primary transition-colors hover:text-primary"
          >
            {item.title}
          </button>
        </h3>
        <div className={cn('col-span-2 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[0.93rem]', item.image && 'sm:col-span-1 sm:col-start-2')}>
          {item.status && (
            <span className="inline-flex items-center gap-2 font-bold text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {item.status}
            </span>
          )}
          {link && <LinkList links={[{ label: pullRequestRef(item.pullRequestUrl) || item.projectName, href: link, kind: item.pullRequestUrl ? 'pr' : 'github' }]} />}
          {when && <span className="text-sm tabular-nums text-text-secondary">{when}</span>}
        </div>
      </div>
      <ClampedText text={item.description} lines={2} className="max-w-[62ch] text-text-secondary" />
      <TechTags items={item.technologies} />
    </article>
  );
}

export function OpenSourceSection() {
  const { data, loading, error, refetch } = usePortfolioData('openSource');
  const [active, setActive] = useState(null);

  if (!loading && !error && (!data || data.length === 0)) return null;

  return (
    <Section id="open-source" title="Open source">
      {loading && <RowsSkeleton rows={1} />}
      {error && <ErrorState message={error} onRetry={refetch} />}

      {data?.map((item) => (
        <Contribution key={item._id} item={item} onOpen={() => setActive(mapOpenSourceToModal(item))} />
      ))}

      <ProjectDetailModal item={active} onClose={() => setActive(null)} />
    </Section>
  );
}
