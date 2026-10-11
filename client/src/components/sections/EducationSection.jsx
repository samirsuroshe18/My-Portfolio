import { Section } from '../layout/Section.jsx';
import { Row } from '../ui/Row.jsx';
import { EntryHeading } from '../ui/EntryHeading.jsx';
import { LinkList } from '../ui/LinkList.jsx';
import { RowsSkeleton } from '../ui/Skeleton.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { formatDateRange } from '../../utils/formatDate.js';

export function EducationSection() {
  const { data, loading, error, refetch } = usePortfolioData('education');

  if (!loading && !error && (!data || data.length === 0)) return null;

  return (
    <Section id="education" title="Education">
      {loading && <RowsSkeleton rows={1} />}
      {error && <ErrorState message={error} onRetry={refetch} />}

      {data?.length > 0 && (
        <div className="border-b border-border">
          {data.map((education) => (
            <Row key={education._id} meta={formatDateRange(education.startDate, education.endDate, education.isCurrent)}>
              <EntryHeading
                logo={education.institutionLogo}
                title={education.degree}
                subtitle={[education.school, education.grade && `Grade ${education.grade}`].filter(Boolean).join('. ')}
              />
              {education.description && <p className="max-w-[62ch] text-text-secondary">{education.description}</p>}
              {education.certificateUrl && <LinkList links={[{ label: 'View certificate', href: education.certificateUrl, kind: 'certificate' }]} />}
            </Row>
          ))}
        </div>
      )}
    </Section>
  );
}
