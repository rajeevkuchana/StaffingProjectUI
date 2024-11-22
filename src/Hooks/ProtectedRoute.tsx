// src/Hooks/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isUserLogin } from '../Utils/Utils';

const PrivateRoutes: React.FC = () => {
  return (
    isUserLogin() ? <Outlet /> : <Navigate to='/login' />
  )
};

export default PrivateRoutes;
