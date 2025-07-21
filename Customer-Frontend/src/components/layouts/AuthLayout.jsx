import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { checkAuth } from '../../utils/auth';

const AuthLayout = () => {
  const location = useLocation();
  const isAuthenticated = checkAuth();

  // Define public paths
  const publicPaths = ['/login', '/register'];

  // If on auth page and logged in, redirect to home
  if (publicPaths.includes(location.pathname)) {
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
  }

  // For protected routes
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default AuthLayout;