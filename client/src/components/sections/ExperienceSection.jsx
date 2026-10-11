import { Section } from '../layout/Section.jsx';
import { Row } from '../ui/Row.jsx';
import { EntryHeading } from '../ui/EntryHeading.jsx';
import { LinkList } from '../ui/LinkList.jsx';
import { TechTags } from '../ui/TechTags.jsx';
import { RowsSkeleton } from '../ui/Skeleton.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { formatDateRange } from '../../utils/formatDate.js';

function ExperienceRow({ experience }) {
  return (
    <Row meta={formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}>
      <EntryHeading logo={experience.companyLogo} title={experience.role} subtitle={[experience.company, experience.location].filter(Boolean).join(', ')} />
      {experience.description && <p className="max-w-[62ch] text-text-secondary">{experience.description}</p>}
      {experience.bulletPoints?.length > 0 && (
        <ul className="flex max-w-[60ch] list-disc flex-col gap-1 pl-[18px] text-[0.95rem] text-text-secondary">
          {experience.bulletPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      <TechTags items={experience.technologies} />
      {experience.certificateUrl && <LinkList links={[{ label: 'View certificate', href: experience.certificateUrl, kind: 'certificate' }]} />}
    </Row>
  );
}

export function ExperienceSection() {
  const { data, loading, error, refetch } = usePortfolioData('experience');

  return (
    <Section id="experience" title="Experience">
      {loading && <RowsSkeleton />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {!loading && !error && data?.length === 0 && <EmptyState title="No experience listed yet" message="Work history will show up here once added." />}

      {data?.length > 0 && (
        <div className="border-b border-border">
          {data.map((experience) => (
            <ExperienceRow key={experience._id} experience={experience} />
          ))}
        </div>
      )}
    </Section>
  );
}
