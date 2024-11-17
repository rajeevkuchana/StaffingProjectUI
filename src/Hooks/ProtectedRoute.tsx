// src/Hooks/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const PrivateRoutes: React.FC = () => {
  const { keycloak } = useKeycloak();

  if (!keycloak?.authenticated) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  return <Outlet />;  // Render protected routes if authenticated
};

export default PrivateRoutes;
