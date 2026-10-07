import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Spinner } from '../components/ui/Spinner.jsx';
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
      <main className="mx-auto max-w-3xl px-5 py-16">
        <Link to="/#projects" className="mb-6 inline-block text-sm font-medium text-primary">
          ← Back to all projects
        </Link>

        {loading && <Spinner />}
        {error && <ErrorState message={error} onRetry={refetch} />}

        {!loading && !error && project && (
          <ProjectDetailContent item={mapProjectToModal(project)} />
        )}
      </main>
      <Footer />
    </>
  );
}

function ProjectDetailContent({ item }) {
  return (
    <article>
      {item.image && <img src={optimizeImage(item.image, 1600)} alt={item.title} className="mb-6 max-h-96 w-full rounded-2xl object-cover" />}
      <h1 className="text-3xl font-bold text-text-primary">{item.title}</h1>
      {item.meta && <p className="mt-1 text-sm text-text-secondary">{item.meta}</p>}

      {item.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}

      <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-text-secondary">{item.description}</p>

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
