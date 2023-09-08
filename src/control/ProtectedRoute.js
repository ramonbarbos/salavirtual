// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './auth';

function ProtectedRoute({ element, ...rest }) {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Route {...rest} element={element} />;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
