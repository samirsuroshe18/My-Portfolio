import { Button } from '../ui/Button.jsx';
import { LinkList } from '../ui/LinkList.jsx';
import { SocialLinks } from '../layout/SocialLinks.jsx';
import { HeroSkeleton } from '../ui/Skeleton.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { formatDateRange } from '../../utils/formatDate.js';
import { optimizeImage } from '../../utils/optimizeImage.js';
import { currentJobLabel, pickGlance, pickProof } from '../../utils/portfolio.js';

const heroButton = 'whitespace-nowrap max-sm:px-1.5 max-sm:text-[0.82rem]';

function GlanceRow({ label, title, lines }) {
  return (
    <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-3 border-t border-border py-3 first:border-t-0">
      <dt className="pt-0.5 text-[0.86rem] text-text-secondary">{label}</dt>
      <dd className="text-[0.96rem] leading-snug">
        <strong className="block font-semibold text-text-primary">{title}</strong>
        {lines.filter(Boolean).map((line, index) => (
          <span key={index} className={index === 0 ? 'block text-text-primary' : 'block text-[0.9rem] tabular-nums text-text-secondary'}>
            {line}
          </span>
        ))}
      </dd>
    </div>
  );
}

function jobLines(job) {
  return [[job.company, job.location].filter(Boolean).join(', '), formatDateRange(job.startDate, job.endDate, job.isCurrent)];
}

export function HeroSection() {
  const { data, loading, error, refetch } = usePortfolioData('profile');
  const { data: experience } = usePortfolioData('experience');
  const { data: projects } = usePortfolioData('projects');
  const { data: openSource } = usePortfolioData('openSource');

  if (loading) return <HeroSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const profile = data?.profile;
  if (!profile) return null;

  const glance = pickGlance(experience);
  const hasGlance = glance.now || glance.before;
  const proof = pickProof(projects, openSource);
  const roleLine = profile.headline || profile.roles?.slice(0, 2).join(' and ');
  const socialLinks = (data.socialLinks || []).filter((link) => link.platform !== 'mail');

  return (
    <section id="about" className="grid scroll-mt-28 sm:scroll-mt-24 gap-x-[72px] gap-y-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
      <div className="flex min-w-0 flex-col gap-6">
        <h1 className="font-serif text-[clamp(3.2rem,8.4vw,6.4rem)] leading-[0.95] tracking-[-0.02em] text-text-primary">{profile.name}</h1>
        {roleLine && <p className="text-[clamp(1.2rem,2.2vw,1.5rem)] font-medium leading-snug text-text-primary">{roleLine}</p>}
        <p className="max-w-[52ch] text-[1.1rem] text-text-secondary">{profile.shortBio || profile.description}</p>

        {/* on phones the buttons share one line as equal columns; from tablet up they size to their text */}
        <div className="grid auto-cols-fr grid-flow-col gap-2 sm:flex sm:flex-wrap sm:gap-3">
          {profile.resumeUrl && (
            <Button as="a" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" size="lg" className={heroButton}>
              Read resume
            </Button>
          )}
          <Button as="a" href="#projects" variant="outline" size="lg" className={heroButton}>
            See projects
          </Button>
          <Button as="a" href="#contact" variant="outline" size="lg" className={heroButton}>
            Get in touch
          </Button>
        </div>

        {/* on phones the links are tightened to stay on one line, and scroll sideways if there are too many to fit */}
        <SocialLinks
          links={socialLinks}
          className="max-sm:flex-nowrap max-sm:justify-between max-sm:gap-x-2 max-sm:overflow-x-auto max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden max-sm:[&_a]:gap-1.5 max-sm:[&_a]:whitespace-nowrap max-sm:[&_a]:text-[0.82rem] max-sm:[&_svg]:text-[0.92rem]"
        />
      </div>

      {(profile.avatarUrl || hasGlance) && (
        <aside aria-label="Summary" className="overflow-hidden rounded-[18px] border border-border bg-card sm:grid sm:grid-cols-[200px_minmax(0,1fr)] lg:block">
          {/* on phones the photo is a short banner, so the two rows under it come into view sooner */}
          {profile.avatarUrl && (
            <img
              src={optimizeImage(profile.avatarUrl, 800)}
              fetchPriority="high"
              decoding="async"
              alt={profile.name}
              className="aspect-[2/1] w-full bg-skeleton object-cover object-[50%_9%] sm:aspect-auto sm:h-full sm:object-[50%_18%] lg:aspect-[5/4] lg:h-auto"
            />
          )}
          {hasGlance && (
            <dl className="px-[22px] pb-2.5 pt-1.5">
              {glance.now && <GlanceRow label={currentJobLabel(glance.now)} title={glance.now.role} lines={jobLines(glance.now)} />}
              {glance.before && <GlanceRow label="Before" title={glance.before.role} lines={jobLines(glance.before)} />}
            </dl>
          )}
        </aside>
      )}

      {proof.length > 0 && (
        <div className="grid border-t border-border sm:grid-cols-3 lg:col-span-2 lg:mt-6">
          {proof.map((item) => (
            <div
              key={item.href}
              className="flex flex-col gap-0.5 border-b border-border py-[18px] sm:border-b-0 sm:border-l sm:py-0 sm:pl-7 sm:pr-7 sm:pt-[22px] sm:first:border-l-0 sm:first:pl-0"
            >
              <strong className="font-semibold text-text-primary">{item.title}</strong>
              <p className="flex-1 text-[0.94rem] text-text-secondary">{item.text}</p>
              <LinkList accent className="mt-2" links={[{ label: item.label, href: item.href, kind: item.kind }]} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
