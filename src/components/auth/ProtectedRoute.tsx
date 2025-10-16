import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean; // Make this prop optional
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  // Don't render anything while auth status is being determined
  if (loading) {
    return null; 
  }

  // If user is not logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If the route requires admin and the user is not an admin, redirect to homepage
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If checks pass, render the child component
  return <>{children}</>;
};
