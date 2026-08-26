import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl font-bold text-surface-200 mb-4">404</div>
      <h1 className="text-2xl font-bold text-surface-900 mb-2">Page not found</h1>
      <p className="text-surface-600 mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button>
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
