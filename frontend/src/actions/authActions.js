export const login = (token, user) => { 
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: 'LOGIN',
    payload: { token, user }
  };
};

export const logout = () => {
  localStorage.removeItem('authToken'); 
  localStorage.removeItem('user') ; // Effacer le token du localStorage
  return {
    type: 'LOGOUT',
  };
};

  