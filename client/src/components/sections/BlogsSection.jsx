import { SectionHeader } from '../layout/SectionHeader.jsx';
import { MediumBlogCard } from '../cards/MediumBlogCard.jsx';
import { Spinner } from '../ui/Spinner.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';

export function BlogsSection() {
  const { data, loading, error, refetch } = usePortfolioData('blogs');

  return (
    <section id="blog" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader title="From the Blog" description="Writing on things I've learned building software." />

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && data?.length === 0 && (
        <EmptyState icon="✍️" title="No blog posts yet" message="Check back soon for new writing." />
      )}

      {!loading && !error && data?.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((blog) => (
            <MediumBlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </section>
  );
}
