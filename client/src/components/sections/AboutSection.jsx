import { SectionHeader } from '../layout/SectionHeader.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { Spinner } from '../ui/Spinner.jsx';

export function AboutSection() {
  const { data, loading } = usePortfolioData('profile');
  const profile = data?.profile;

  if (loading) return <Spinner />;
  if (!profile) return null;

  const facts = [
    { label: 'Location', value: profile.location },
    { label: 'Availability', value: profile.availability },
    { label: 'Headline', value: profile.headline },
  ].filter((fact) => fact.value);

  if (!profile.shortBio && facts.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader title="About Me" description={profile.shortBio} />
      {facts.length > 0 && (
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-xl border border-border bg-card p-5 text-center shadow-glow">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{fact.label}</p>
              <p className="mt-1 text-sm font-medium text-text-primary">{fact.value}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
