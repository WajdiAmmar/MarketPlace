export const login = (token, user) => {
  localStorage.setItem('authToken', token); 
  return {
    type: 'LOGIN',
    payload: { token, user }
  };
};

export const logout = () => {
  localStorage.removeItem('authToken');  // Effacer le token du localStorage
  return {
    type: 'LOGOUT',
  };
};

  