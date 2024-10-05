// src/components/Login/LoginPage.js
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'; // Import Eye and EyeOff icons
import '../styles/Main.scss'; // Ensure this path is correct and the file exists

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password, rememberMe });
    // Implement your authentication logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-sm w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-800 rounded-full p-3">
            {/* Use a valid image path. For example, place your icon in the public folder and reference it as '/user-icon.png' */}
            <User className="text-white" size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-6">WELCOME</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <Mail className="absolute top-3 left-3 text-blue-200" size={20} />
            <input
              type="email"
              className="w-full bg-transparent border-b border-blue-200 py-2 pl-10 pr-4 text-white placeholder-blue-200 focus:outline-none focus:border-white"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <Lock className="absolute top-3 left-3 text-blue-200" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}  // Toggle between 'text' and 'password'
              className="w-full bg-transparent border-b border-blue-200 py-2 pl-10 pr-10 text-white placeholder-blue-200 focus:outline-none focus:border-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Toggle button for showing/hiding password */}
            <button
              type="button"
              className="absolute top-3 right-3 text-blue-200 hover:text-white focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Switch between Eye and EyeOff */}
            </button>
          </div>
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center text-blue-100">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className="text-blue-100 hover:text-white">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
