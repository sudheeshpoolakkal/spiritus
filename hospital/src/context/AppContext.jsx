// src/context/AppContext.js
import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem('hToken') || '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'; 

  return (
    <AppContext.Provider value={{ aToken, setAToken, backendUrl }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;