import { formatDate } from '../../utils/formatDate.js';

export function MediumBlogCard({ blog }) {
  return (
    <a
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-glow transition-all hover:-translate-y-1.5 hover:shadow-xl"
    >
      {blog.coverImage && (
        <img src={blog.coverImage} alt={blog.title} className="h-40 w-full object-cover transition-transform group-hover:scale-105" />
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-medium text-text-secondary/80">{formatDate(blog.publishedAt)}</p>
        <h3 className="line-clamp-2 text-lg font-semibold text-text-primary group-hover:text-primary">{blog.title}</h3>
        {blog.description && <p className="line-clamp-3 text-sm text-text-secondary">{blog.description}</p>}
        <span className="mt-1 text-sm font-semibold text-primary">Read on Medium →</span>
      </div>
    </a>
  );
}
