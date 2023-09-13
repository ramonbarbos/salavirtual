import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateRoom from './view/CreateRoom';
import Rooms from './view/Rooms';
import Sala from './view/Sala';
import Login from './view/Login';
import { AuthProvider } from './control/auth';
import ProtectedRoute from './control/ProtectedRoute';
import Usuarios from './view/Usuarios';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} index  />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <CreateRoom />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/lobby"
            element={
              <ProtectedRoute>
                <Rooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sala/:id"
            element={
              <ProtectedRoute>
                <Sala />
              </ProtectedRoute>
            }
          />
           <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
