import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <p className="text-lg text-text-secondary">This page doesn't exist.</p>
      <Button as={Link} to="/">
        Back to Home
      </Button>
    </div>
  );
}
