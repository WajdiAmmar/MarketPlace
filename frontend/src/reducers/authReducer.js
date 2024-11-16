const initialState = {
    isAuthenticated: false,  
    token: null, 
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,  // L'utilisateur est connecté
          token: action.payload.token,  // Sauvegarder le token
        };
  
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,  // L'utilisateur est déconnecté
          token: null,  // Effacer le token
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  