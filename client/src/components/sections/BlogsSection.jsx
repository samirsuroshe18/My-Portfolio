import { Section } from '../layout/Section.jsx';
import { Row } from '../ui/Row.jsx';
import { GitHubActivityGraph } from '../graphs/GitHubActivityGraph.jsx';
import { RowsSkeleton } from '../ui/Skeleton.jsx';
import { ErrorState } from '../ui/ErrorState.jsx';
import { usePortfolioData } from '../../hooks/usePortfolioData.js';
import { cn } from '../../utils/classNames.js';
import { formatMonthYear } from '../../utils/formatDate.js';
import { optimizeImage } from '../../utils/optimizeImage.js';

function PostRow({ blog }) {
  // On a phone the cover sits beside the text, and the title and description are cut to two
  // lines each so the text stays about as tall as the cover. Wider screens show everything.
  return (
    <Row meta={formatMonthYear(blog.publishedAt)}>
      <div className="grid grid-cols-[128px_minmax(0,1fr)] items-start gap-x-4 gap-y-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-x-6">
        {blog.coverImage && (
          <img
            src={optimizeImage(blog.coverImage, 440)}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-[10px] border border-border bg-skeleton object-cover md:aspect-[16/10]"
          />
        )}
        <div className={cn('flex min-w-0 flex-col gap-1 md:gap-2.5', !blog.coverImage && 'col-span-2')}>
          <h3 className="line-clamp-2 text-[1rem] font-semibold leading-snug md:line-clamp-none md:text-[1.14rem]">
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary underline decoration-text-secondary decoration-1 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              {blog.title}
            </a>
          </h3>
          {blog.description && <p className="line-clamp-2 max-w-[62ch] text-[0.9rem] text-text-secondary md:line-clamp-none md:text-[1rem]">{blog.description}</p>}
          {blog.tags?.length > 0 && <p className="hidden text-[0.93rem] text-text-secondary md:block">{blog.tags.slice(0, 3).join(', ')}</p>}
        </div>
      </div>
    </Row>
  );
}

export function BlogsSection() {
  const { data, loading, error, refetch } = usePortfolioData('blogs');
  const { data: github } = usePortfolioData('github');

  const posts = data || [];
  const hasGithub = Boolean(github?.available);

  // with no posts, the section waits for the GitHub data so it never shows a heading with nothing under it
  if (!loading && !error && posts.length === 0 && !hasGithub) return null;

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

      {hasGithub && <GitHubActivityGraph username={github.username} chartUrl={github.chartUrl} profileUrl={github.profileUrl} calendar={github.calendar} />}
    </Section>
  );
}
