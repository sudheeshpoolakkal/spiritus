// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
// Import other necessary components


function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
