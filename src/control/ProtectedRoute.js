// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './auth';

function ProtectedRoute({children}) {
  const { user } = useContext(AuthContext);
  console.log(user)
  if (!user.login) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
