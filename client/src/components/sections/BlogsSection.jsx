import { Section } from '../layout/Section.jsx';
import { Row } from '../ui/Row.jsx';
import { GitHubActivityGraph } from '../graphs/GitHubActivityGraph.jsx';
import { RowsSkeleton } from '../ui/Skeleton.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { formatMonthYear } from '../../utils/formatDate.js';
import { optimizeImage } from '../../utils/optimizeImage.js';

function PostRow({ blog }) {
  return (
    <Row meta={formatMonthYear(blog.publishedAt)}>
      <div className="grid gap-x-6 gap-y-4 md:grid-cols-[220px_minmax(0,1fr)]">
        {blog.coverImage && (
          <img
            src={optimizeImage(blog.coverImage, 440)}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full max-w-[260px] rounded-[10px] border border-border bg-skeleton object-cover md:max-w-none"
          />
        )}
        <div className="flex min-w-0 flex-col gap-2.5">
          <h3 className="text-[1.14rem] font-semibold leading-snug">
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary underline decoration-text-secondary decoration-1 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              {blog.title}
            </a>
          </h3>
          {blog.description && <p className="line-clamp-4 max-w-[62ch] text-text-secondary">{blog.description}</p>}
          {blog.tags?.length > 0 && <p className="text-[0.93rem] text-text-secondary">{blog.tags.slice(0, 3).join(', ')}</p>}
        </div>
      </div>
    </Row>
  );
}

export function BlogsSection() {
  const { data, loading, error, refetch } = usePortfolioData('blogs');
  const { data: github, loading: githubLoading } = usePortfolioData('github');

  const posts = data || [];
  const hasGithub = Boolean(github?.available);

  if (!loading && !githubLoading && !error && posts.length === 0 && !hasGithub) return null;

  return (
    <Section id="blog" title={posts.length > 0 || loading ? 'Writing and activity' : 'Activity'}>
      {loading && <RowsSkeleton rows={1} />}
      {error && <ErrorState message={error} onRetry={refetch} />}

      {posts.length > 0 && (
        <div className="border-b border-border">
          {posts.map((blog) => (
            <PostRow key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      {hasGithub && <GitHubActivityGraph username={github.username} chartUrl={github.chartUrl} profileUrl={github.profileUrl} />}
    </Section>
  );
}
