import { createContext, useState } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {isAuthenticated: !isAuthenticated},
  user: null,
  setUser: () => {}
});

export default AuthContext;