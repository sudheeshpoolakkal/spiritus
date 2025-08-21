import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { HospitalContext } from '../context/HospitalContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { setHToken } = useContext(HospitalContext);

  const userRole = 'Hospital';

  const logout = () => {
    setHToken('');
    localStorage.removeItem('hToken');
    window.location.replace('/hospital-login');
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-md'>
      <div className='flex items-center gap-4'>
        {/* Logo + Text */}
        <div 
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img
            className="h-10 w-auto object-contain"
            src={assets.admin_logo}
            alt="Logo"
          />
          <span
            className="text-2xl font-semibold tracking-wide ml-3"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Spiritus
          </span>
        </div>

        {/* Role badge */}
        <p className='border px-3 py-1 rounded-full border-gray-400 text-sm text-gray-700 bg-gray-100'>
          {userRole}
        </p>
      </div>

      {/* Logout button */}
      <button 
        onClick={logout} 
        className='bg-green-500 hover:bg-green-600 cursor-pointer text-white text-sm font-semibold px-6 py-2 rounded-full transition-colors duration-300'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
