import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  // Vérifier si l'utilisateur est authentifié et a le rôle 'admin'
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" />; // Rediriger vers la page d'accueil si ce n'est pas un admin
  }

  return children;
};

export default ProtectedRoute;
