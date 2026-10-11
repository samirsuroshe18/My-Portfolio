import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Skeleton } from '../components/ui/Skeleton.jsx';
import { ErrorState } from '../components/ui/ErrorState.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { projectsApi } from '../services/api/projects.js';
import { mapProjectToModal } from '../utils/mapToModalItem.js';
import { optimizeImage } from '../utils/optimizeImage.js';

export function ProjectDetailPage() {
  const { id } = useParams();
  const { data: project, loading, error, refetch } = useFetch(() => projectsApi.getById(id), [id]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-[clamp(16px,5vw,48px)] py-12 sm:py-16">
        <Link to="/#projects" className="mb-8 inline-block text-sm font-medium text-text-secondary underline decoration-1 underline-offset-4 transition-colors hover:text-text-primary">
          Back to all projects
        </Link>

        {loading && <ProjectDetailSkeleton />}
        {error && <ErrorState message={error} onRetry={refetch} />}

        {!loading && !error && project && <ProjectDetailContent item={mapProjectToModal(project)} />}
      </main>
      <Footer />
    </>
  );
}

function ProjectDetailSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-4">
      <Skeleton className="aspect-[16/10] rounded-[14px]" />
      <Skeleton className="mt-3 h-12 w-[70%]" />
      <Skeleton className="h-3.5 w-[30%]" />
      <Skeleton className="mt-3 h-3.5 w-full" />
      <Skeleton className="h-3.5 w-[94%]" />
      <Skeleton className="h-3.5 w-[60%]" />
    </div>
  );
}

function ProjectDetailContent({ item }) {
  return (
    <article>
      {item.image && (
        <img src={optimizeImage(item.image, 1600)} alt={item.title} decoding="async" className="mb-8 max-h-96 w-full rounded-[14px] border border-border bg-skeleton object-cover" />
      )}
      <h1 className="font-serif text-[clamp(2.2rem,5vw,3.2rem)] leading-[1.05] tracking-[-0.01em] text-text-primary">{item.title}</h1>
      {item.meta && <p className="mt-2 text-sm tabular-nums text-text-secondary">{item.meta}</p>}
      {item.tags?.length > 0 && <p className="mt-1 text-[0.93rem] text-text-secondary">{item.tags.join(', ')}</p>}

      <p className="mt-6 max-w-[62ch] whitespace-pre-line text-text-secondary">{item.description}</p>

      {item.actions?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {item.actions.map((action) => (
            <Button key={action.label} as="a" href={action.href} target="_blank" rel="noopener noreferrer" variant={action.variant || 'primary'}>
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </article>
  );
}
