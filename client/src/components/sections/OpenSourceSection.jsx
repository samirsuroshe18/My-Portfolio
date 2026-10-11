import { useState } from 'react';
import { Section } from '../layout/Section.jsx';
import { Row } from '../ui/Row.jsx';
import { LinkList } from '../ui/LinkList.jsx';
import { TechTags } from '../ui/TechTags.jsx';
import { ProjectDetailModal } from '../modals/ProjectDetailModal.jsx';
import { RowsSkeleton } from '../ui/Skeleton.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { cn } from '../../utils/classNames.js';
import { formatMonthYear } from '../../utils/formatDate.js';
import { mapHackathonToModal, mapOpenSourceToModal } from '../../utils/mapToModalItem.js';
import { optimizeImage } from '../../utils/optimizeImage.js';
import { pullRequestRef } from '../../utils/portfolio.js';

const titleButton = 'cursor-pointer text-left text-[1.14rem] font-semibold leading-snug text-text-primary transition-colors hover:text-primary';

function Contribution({ item, onOpen }) {
  const link = item.pullRequestUrl || item.repositoryUrl;
  const when = [formatMonthYear(item.date), item.release && `released in ${item.release}`].filter(Boolean).join(', ');

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border bg-card px-5 py-6 sm:px-7 sm:py-7">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.95rem]">
        {item.status && (
          <span className="inline-flex items-center gap-2 font-bold text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {item.status}
          </span>
        )}
        {link && <LinkList links={[{ label: pullRequestRef(item.pullRequestUrl) || item.projectName, href: link, kind: item.pullRequestUrl ? 'pr' : 'github' }]} />}
        {when && <span className="text-sm tabular-nums text-text-secondary">{when}</span>}
      </div>
      <h3>
        <button onClick={onOpen} className={titleButton}>
          {item.title}
        </button>
      </h3>
      {item.description && <p className="max-w-[62ch] text-text-secondary">{item.description}</p>}
      <TechTags items={item.technologies} />
    </article>
  );
}

function hackathonLinks(hackathon) {
  return [
    { label: 'Live demo', href: hackathon.liveUrl, kind: 'live' },
    { label: 'Source code', href: hackathon.githubUrl, kind: 'code' },
    { label: 'Watch demo', href: hackathon.youtubeUrl, kind: 'demo' },
    { label: 'View certificate', href: hackathon.certificateUrl, kind: 'certificate' },
  ].filter((link) => link.href);
}

function HackathonRow({ hackathon, onOpen }) {
  const members = hackathon.members || [];
  const sponsors = hackathon.sponsors || [];
  const facts = [hackathon.organizer, hackathon.duration, members.length > 0 && `team of ${members.length}`].filter(Boolean).join(', ');
  const credits = [
    members.length > 0 && `Team: ${members.map((member) => member.name).join(', ')}.`,
    sponsors.length > 0 && `Sponsors: ${sponsors.join(', ')}.`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Row meta={formatMonthYear(hackathon.date)}>
      <div className="grid gap-x-6 gap-y-4 md:grid-cols-[220px_minmax(0,1fr)]">
        {hackathon.image && (
          <img
            src={optimizeImage(hackathon.image, 440)}
            alt={`${hackathon.organizer || hackathon.title} poster`}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full rounded-[10px] border border-border bg-skeleton object-cover"
          />
        )}
        <div className={cn('flex min-w-0 flex-col gap-2.5', !hackathon.image && 'md:col-span-2')}>
          <div>
            <h3>
              <button onClick={onOpen} className={titleButton}>
                {hackathon.title}
              </button>
            </h3>
            {facts && <p className="text-[0.93rem] text-text-secondary">{facts}</p>}
          </div>
          {hackathon.description && <p className="max-w-[62ch] text-text-secondary">{hackathon.description}</p>}
          {credits && <p className="text-[0.93rem] text-text-secondary">{credits}</p>}
          <TechTags items={hackathon.tags} limit={7} />
          <LinkList links={hackathonLinks(hackathon)} />
        </div>
      </div>
    </Row>
  );
}

function sectionTitle(hasContributions, hasHackathons) {
  if (hasContributions && !hasHackathons) return 'Open source';
  if (hasHackathons && !hasContributions) return 'Hackathons';
  return 'Open source and hackathons';
}

export function OpenSourceSection() {
  const openSource = usePortfolioData('openSource');
  const hackathons = usePortfolioData('hackathons');
  const [active, setActive] = useState(null);

  const contributions = openSource.data || [];
  const events = hackathons.data || [];
  const loading = openSource.loading || hackathons.loading;
  const failed = openSource.error || hackathons.error;

  if (!loading && !failed && contributions.length === 0 && events.length === 0) return null;

  return (
    <Section id="open-source" title={sectionTitle(contributions.length > 0, events.length > 0)}>
      {loading && <RowsSkeleton />}
      {openSource.error && <ErrorState message={openSource.error} onRetry={openSource.refetch} />}
      {hackathons.error && <ErrorState message={hackathons.error} onRetry={hackathons.refetch} />}

      {!loading &&
        contributions.map((item) => <Contribution key={item._id} item={item} onOpen={() => setActive(mapOpenSourceToModal(item))} />)}

      {!loading && events.length > 0 && (
        <div id="hackathons" className="scroll-mt-28 sm:scroll-mt-24 border-b border-border">
          {events.map((hackathon) => (
            <HackathonRow key={hackathon._id} hackathon={hackathon} onOpen={() => setActive(mapHackathonToModal(hackathon))} />
          ))}
        </div>
      )}

      <ProjectDetailModal item={active} onClose={() => setActive(null)} />
    </Section>
  );
}
