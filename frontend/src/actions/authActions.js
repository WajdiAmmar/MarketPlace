// Action pour connecter un utilisateur
export const login = (token, user) => { 
  // Stocker le token d'authentification dans le localStorage
  localStorage.setItem('authToken', token);
  
  // Stocker l'objet utilisateur dans le localStorage après l'avoir converti en chaîne JSON
  localStorage.setItem('user', JSON.stringify(user));
  
  // Retourner une action de type 'LOGIN' avec les données nécessaires (token et utilisateur)
  return {
    type: 'LOGIN', // Type de l'action
    payload: { token, user } // Données à envoyer à l'état global (store)
  };
};

// Action pour déconnecter un utilisateur
export const logout = () => {
  // Supprimer le token d'authentification du localStorage
  localStorage.removeItem('authToken'); 
  
  // Supprimer l'objet utilisateur du localStorage
  localStorage.removeItem('user'); 
  
  // Retourner une action de type 'LOGOUT' pour indiquer la déconnexion
  return {
    type: 'LOGOUT', // Type de l'action
  };
};
