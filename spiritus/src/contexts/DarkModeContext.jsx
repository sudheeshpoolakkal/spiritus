// src/contexts/DarkModeContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the DarkModeContext with default values
export const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

// DarkModeProvider component to manage dark mode state and provide it to children
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Ensure window is defined (important for SSR)
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem('darkMode');
      if (storedPreference) {
        try {
          return JSON.parse(storedPreference);
        } catch (error) {
          console.error('Failed to parse darkMode from localStorage:', error);
          return false;
        }
      }
      // Use system preference if no preference is stored
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // Default to light mode on the server
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Failed to save darkMode to localStorage:', error);
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
