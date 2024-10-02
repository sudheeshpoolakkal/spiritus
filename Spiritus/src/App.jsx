// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
// Import other necessary components

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
