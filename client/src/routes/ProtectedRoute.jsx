import React from 'react';
import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ROUTES } from '../constants/routes';

export const ProtectedRoute = () => {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  const location = useLocation();

  // Show full-screen loader while checking authentication
  if (loading) {
    return (
      <LoadingSpinner
        fullPage
        size="large"
        message="Authenticating..."
      />
    );
  }

  // Redirect unauthenticated users to login
  // while remembering the page they attempted to visit.
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // Render protected routes
  return <Outlet />;
};