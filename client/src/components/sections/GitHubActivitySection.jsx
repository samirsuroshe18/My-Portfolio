import { SectionHeader } from '../layout/SectionHeader.jsx';
import { GitHubActivityGraph } from '../graphs/GitHubActivityGraph.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';

export function GitHubActivitySection() {
  const { data } = usePortfolioData('github');

  if (!data?.available) return null;

  return (
    <section className="mx-auto max-w-5xl px-5 py-20">
      <SectionHeader title="GitHub Activity" description="A snapshot of my open-source contribution history." />
      <GitHubActivityGraph username={data.username} chartUrl={data.chartUrl} profileUrl={data.profileUrl} />
    </section>
  );
}
