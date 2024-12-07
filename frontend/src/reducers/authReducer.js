// État initial pour la gestion de l'authentification
const initialState = {
  isAuthenticated: false, // Indique si l'utilisateur est connecté
  user: null,             // Stocke les informations de l'utilisateur connecté
  token: null,            // Stocke le jeton d'authentification
};

// Réducteur pour gérer les actions liées à l'authentification
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Action de connexion (LOGIN)
    case 'LOGIN':
      return {
        ...state,                 // Conserver les autres propriétés de l'état
        isAuthenticated: true,    // Définir l'utilisateur comme connecté
        user: action.payload.user, // Mettre à jour les informations utilisateur
        token: action.payload.token, // Stocker le jeton d'authentification
      };

    // Action de déconnexion (LOGOUT)
    case 'LOGOUT':
      return {
        ...state,                 // Conserver les autres propriétés de l'état
        isAuthenticated: false,   // Définir l'utilisateur comme déconnecté
        user: null,               // Réinitialiser les informations utilisateur
        token: null,              // Supprimer le jeton d'authentification
      };

    // Action par défaut (aucun changement dans l'état)
    default:
      return state; // Retourne l'état actuel si l'action n'est pas reconnue
  }
};

export default authReducer; // Exportation du réducteur pour l'utiliser dans le store Redux
