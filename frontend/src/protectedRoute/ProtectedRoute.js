import React from 'react';
import { Navigate } from 'react-router-dom'; // Composant pour rediriger l'utilisateur
import { useSelector } from 'react-redux'; // Hook Redux pour accéder à l'état global

// Composant pour protéger les routes accessibles uniquement aux utilisateurs authentifiés avec le rôle d'admin
const ProtectedRoute = ({ children }) => {
  // Récupération de l'état d'authentification et des informations utilisateur depuis Redux
  const { isAuthenticated, user } = useSelector(state => state.auth);

  // Vérifier si l'utilisateur est authentifié
  if (!isAuthenticated) {
    // Si l'utilisateur n'est pas authentifié, le rediriger vers la page de connexion
    return <Navigate to="/login" />;
  }

  // Vérifier si l'utilisateur a le rôle 'admin'
  if (user?.role !== 'admin') {
    // Si l'utilisateur n'est pas un administrateur, le rediriger vers la page d'accueil
    return <Navigate to="/" />;
  }

  // Si toutes les conditions sont remplies, afficher les enfants (contenu protégé)
  return children;
};

export default ProtectedRoute;
