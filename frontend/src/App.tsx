import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Applications from './pages/Applications';
import ApplicationDetail from './pages/ApplicationDetail';
import Dashboard from './pages/Dashboard';
import SavedJobs from './pages/SavedJobs';
import ProfilePage from './pages/Profile';
import Notifications from './pages/Notifications';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full" />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes with simple navbar */}
      <Route path="/" element={<Layout><Landing /></Layout>} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

      {/* Jobs are public but accessible to all */}
      <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
      <Route path="/jobs/:id" element={<Layout><JobDetail /></Layout>} />

      {/* Authenticated routes with dashboard sidebar layout */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>}
      />
      <Route
        path="/applications"
        element={<ProtectedRoute><DashboardLayout><Applications /></DashboardLayout></ProtectedRoute>}
      />
      <Route
        path="/applications/:id"
        element={<ProtectedRoute><DashboardLayout><ApplicationDetail /></DashboardLayout></ProtectedRoute>}
      />
      <Route
        path="/saved"
        element={<ProtectedRoute><DashboardLayout><SavedJobs /></DashboardLayout></ProtectedRoute>}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute><DashboardLayout><ProfilePage /></DashboardLayout></ProtectedRoute>}
      />
      <Route
        path="/notifications"
        element={<ProtectedRoute><DashboardLayout><Notifications /></DashboardLayout></ProtectedRoute>}
      />
      <Route
        path="/admin"
        element={<AdminRoute><DashboardLayout><Admin /></DashboardLayout></AdminRoute>}
      />

      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
