// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage to persist login across refreshes
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    return storedLogin ? JSON.parse(storedLogin) : false;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update localStorage whenever isLoggedIn or user changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('user', JSON.stringify(user));
  }, [isLoggedIn, user]);

  // Function to handle login
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Function to handle logout
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
