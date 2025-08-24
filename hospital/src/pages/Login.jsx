import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HospitalContext } from '../context/HospitalContext';
import bgImage from '../assets/assets_admin/aurora.webp';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setHToken, backendUrl } = useContext(HospitalContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', { 
        email: email.trim(), 
        password: password ? '***hidden***' : 'empty',
        backendUrl 
      });
      
      const response = await axios.post(`${backendUrl}/api/hospital/login`, { 
        email: email.trim(), 
        password 
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        localStorage.setItem('hToken', response.data.token);
        setHToken(response.data.token);
        toast.success(response.data.message || 'Login successful!');
        console.log('Token stored in localStorage:', localStorage.getItem('hToken'));
        navigate('/hospital-dashboard');
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 400) {
        toast.error('Invalid login credentials. Please check your email and password.');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <button
        onClick={() => window.location.href = "https://spiritus.vercel.app/"}
        className="absolute top-12 right-12 bg-gray-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-500 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <form onSubmit={onSubmitHandler} className="bg-[#242425] p-8 rounded-3xl shadow-lg w-full max-w-md text-zinc-200">
        <h2 className="text-2xl font-bold mb-4">Hospital Login</h2>
        <p className="mb-6">Log in to access your dashboard</p>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            disabled={isLoading}
            className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200 disabled:opacity-50"
            
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            disabled={isLoading}
            className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200 disabled:opacity-50"
            
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 mb-4 rounded-full bg-[#0d8845] cursor-pointer text-white font-semibold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

      </form>
    </div>
  );
}

export default Login;