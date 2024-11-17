const initialState = {
    isAuthenticated: false, 
    user: null, 
    token: null, 
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        console.log( "Login :",{ ...state, isAuthenticated: true, user: action.payload.user, token: action.payload.token });
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
        };
      case 'LOGOUT':
        console.log("Logout:", { ...state, isAuthenticated: false, user: null, token: null });
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  