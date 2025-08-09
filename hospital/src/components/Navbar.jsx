import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';


const Navbar = () => {
  const navigate = useNavigate();

  const userRole = 'Hospital';

  const logout = () => {
    localStorage.removeItem('hToken');
    navigate('/');
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        {/* Logo + Text */}
        <div className="flex items-center h-7">
          <img
            onClick={() => navigate("/")}
            style={{ transform: "scale(2.2)" }}
            className="h-full w-auto cursor-pointer object-contain"
            src={assets.admin_logo}
            alt="Logo"
          />
          <span
            onClick={() => navigate("/")}
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              color: "black",
              fontWeight: 600,
              fontSize: "1.6rem",
              transform: "translateY(-2.4px)"
            }}
            className="tracking-wide ml-3 cursor-pointer transition-all duration-300 hover:scale-105"
          >
            Spiritus
          </span>
        </div>

        {/* Role badge */}
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
          {userRole}
        </p>
      </div>

      {/* Logout button */}
      <button 
        onClick={logout} 
        className='bg-[#0d8845] cursor-pointer text-white text-sm px-10 py-2 rounded-full'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
