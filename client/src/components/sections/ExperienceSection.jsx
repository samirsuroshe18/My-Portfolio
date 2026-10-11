import { Section } from '../layout/Section.jsx';
import { Row } from '../ui/Row.jsx';
import { LinkList } from '../ui/LinkList.jsx';
import { TechTags } from '../ui/TechTags.jsx';
import { RowsSkeleton } from '../ui/Skeleton.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { formatDateRange } from '../../utils/formatDate.js';
import { optimizeImage } from '../../utils/optimizeImage.js';

function Heading({ logo, title, subtitle }) {
  return (
    <div className="flex items-center gap-3.5">
      {logo && <img src={optimizeImage(logo, 96)} alt="" loading="lazy" decoding="async" className="h-[46px] w-[46px] flex-none rounded-[10px] bg-white object-contain" />}
      <div className="min-w-0">
        <h3 className="text-[1.14rem] font-semibold leading-snug text-text-primary">{title}</h3>
        {subtitle && <p className="text-[0.93rem] text-text-secondary">{subtitle}</p>}
      </div>
    </div>
  );
}

function ExperienceRow({ experience }) {
  return (
    <Row meta={formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}>
      <Heading logo={experience.companyLogo} title={experience.role} subtitle={[experience.company, experience.location].filter(Boolean).join(', ')} />
      {experience.description && <p className="max-w-[62ch] text-text-secondary">{experience.description}</p>}
      {experience.bulletPoints?.length > 0 && (
        <ul className="flex max-w-[60ch] list-disc flex-col gap-1 pl-[18px] text-[0.95rem] text-text-secondary">
          {experience.bulletPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      <TechTags items={experience.technologies} />
      {experience.certificateUrl && <LinkList links={[{ label: 'View certificate', href: experience.certificateUrl }]} />}
    </Row>
  );
}

function EducationRow({ education, id }) {
  return (
    <Row id={id} meta={formatDateRange(education.startDate, education.endDate, education.isCurrent)}>
      <Heading
        logo={education.institutionLogo}
        title={education.degree}
        subtitle={[education.school, education.grade && `Grade ${education.grade}`].filter(Boolean).join('. ')}
      />
      {education.description && <p className="max-w-[62ch] text-text-secondary">{education.description}</p>}
      {education.certificateUrl && <LinkList links={[{ label: 'View certificate', href: education.certificateUrl }]} />}
    </Row>
  );
}

export function ExperienceSection() {
  const { data, loading, error, refetch } = usePortfolioData('experience');
  const { data: education } = usePortfolioData('education');

  const jobs = data || [];
  const schools = education || [];
  const isEmpty = !loading && !error && jobs.length === 0 && schools.length === 0;

  return (
    <Section id="experience" title="Experience">
      {loading && <RowsSkeleton />}
      {error && <ErrorState message={error} onRetry={refetch} />}
      {isEmpty && <EmptyState title="No experience listed yet" message="Work history will show up here once added." />}

      {!loading && jobs.length + schools.length > 0 && (
        <div className="border-b border-border">
          {jobs.map((experience) => (
            <ExperienceRow key={experience._id} experience={experience} />
          ))}
          {schools.map((item, index) => (
            <EducationRow key={item._id} education={item} id={index === 0 ? 'education' : undefined} />
          ))}
        </div>
      )}
    </Section>
  );
}
