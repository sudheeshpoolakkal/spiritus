import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between py-4 mb-5 border-b border-gray-400">
      
      {/* Logo */}
      <img onClick={() => navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        {['/', '/doctors', '/about', '/contact'].map((path, index) => (
          <NavLink key={index} to={path} className="relative group">
            <li className="py-1 transition duration-300 hover:text-primary">
              {path === '/' ? 'Home' : path.slice(1).replace('-', ' ')}
            </li>
            <hr className="absolute left-0 bottom-0 w-3/5 m-auto h-0.5 bg-primary hidden group-hover:block" />
          </NavLink>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          // Profile Dropdown
          <div className="relative group flex items-center gap-2 cursor-pointer">
            <img className="w-10 h-10 rounded-full shadow-md" src={userData.image} alt="User" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md py-2 px-4 text-gray-600 text-sm font-medium hidden group-hover:block z-20">
              <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer py-1">My Profile</p>
              <p onClick={() => navigate('/my-appointments')} className="hover:text-black cursor-pointer py-1">My Appointments</p>
              <p onClick={logout} className="hover:text-black cursor-pointer py-1">Logout</p>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className="bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block hover:scale-105 transition duration-300"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <img onClick={() => setShowMenu(true)} className="w-6 md:hidden cursor-pointer" src={assets.menu_icon} alt="Menu" />
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${showMenu ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-30`}>
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
          <img className="w-36" src={assets.logo} alt="Logo" />
          <img className="w-7 cursor-pointer" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <ul className="flex flex-col items-center gap-4 mt-6 text-lg font-medium">
          {['/', '/doctors', '/about', '/contact'].map((path, index) => (
            <NavLink key={index} to={path} onClick={() => setShowMenu(false)} className="px-4 py-2 rounded inline-block hover:bg-gray-100 w-full text-center">
              {path === '/' ? 'HOME' : path.slice(1).toUpperCase()}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Overlay when Mobile Menu is Open */}
      {showMenu && <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={() => setShowMenu(false)}></div>}
      
    </nav>
  );
};

export default Navbar;
