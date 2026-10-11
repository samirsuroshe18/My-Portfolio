import { useState } from 'react';
import { Section } from '../layout/Section.jsx';
import { Row } from '../ui/Row.jsx';
import { ClampedText } from '../ui/ClampedText.jsx';
import { LinkList } from '../ui/LinkList.jsx';
import { TechTags } from '../ui/TechTags.jsx';
import { ProjectDetailModal } from '../modals/ProjectDetailModal.jsx';
import { RowsSkeleton } from '../ui/Skeleton.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { cn } from '../../utils/classNames.js';
import { formatMonthYear } from '../../utils/formatDate.js';
import { mapHackathonToModal } from '../../utils/mapToModalItem.js';
import { optimizeImage } from '../../utils/optimizeImage.js';

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
  return (
    <Row meta={formatMonthYear(hackathon.date)}>
      <div className="grid gap-x-6 gap-y-4 md:grid-cols-[220px_minmax(0,1fr)]">
        {hackathon.image && (
          <img
            src={optimizeImage(hackathon.image, 440)}
            alt={`${hackathon.title} screenshot`}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full rounded-[10px] border border-border bg-skeleton object-cover"
          />
        )}
        <div className={cn('flex min-w-0 flex-col gap-2.5', !hackathon.image && 'md:col-span-2')}>
          <div>
            <h3>
              <button
                onClick={onOpen}
                className="cursor-pointer text-left text-[1.14rem] font-semibold leading-snug text-text-primary transition-colors hover:text-primary"
              >
                {hackathon.title}
              </button>
            </h3>
            {facts && <p className="text-[0.93rem] text-text-secondary">{facts}</p>}
          </div>
          <ClampedText text={hackathon.description} lines={2} className="max-w-[62ch] text-text-secondary" />
          {/* one compact line: the team as overlapping photos, the sponsors as text */}
          {(members.length > 0 || sponsors.length > 0) && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9rem] text-text-secondary">
              {members.length > 0 && (
                <ul aria-label={`Team: ${members.map((member) => member.name).join(', ')}`} className="flex flex-none items-center">
                  {members.map((member) => (
                    <li key={member.name} title={member.name} className="-ml-1.5 first:ml-0">
                      {member.avatarUrl ? (
                        <img
                          src={optimizeImage(member.avatarUrl, 56)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-6 w-6 rounded-full border-2 border-bg bg-skeleton object-cover"
                        />
                      ) : (
                        <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full border-2 border-bg bg-card-light text-[0.65rem] font-semibold text-text-primary">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {sponsors.length > 0 && (
                <p className="min-w-0">
                  <span className="font-semibold text-text-primary">Sponsors</span> {sponsors.join(', ')}
                </p>
              )}
            </div>
          )}
          <TechTags items={hackathon.tags} limit={7} />
          <LinkList links={hackathonLinks(hackathon)} />
        </div>
      </div>
    </Row>
  );
}

export function HackathonsSection() {
  const { data, loading, error, refetch } = usePortfolioData('hackathons');
  const [active, setActive] = useState(null);

  if (!loading && !error && (!data || data.length === 0)) return null;

  return (
    <Section id="hackathons" title="Hackathons">
      {loading && <RowsSkeleton />}
      {error && <ErrorState message={error} onRetry={refetch} />}

      {data?.length > 0 && (
        <div className="border-b border-border">
          {data.map((hackathon) => (
            <HackathonRow key={hackathon._id} hackathon={hackathon} onOpen={() => setActive(mapHackathonToModal(hackathon))} />
          ))}
        </div>
      )}

      <ProjectDetailModal item={active} onClose={() => setActive(null)} />
    </Section>
  );
}
