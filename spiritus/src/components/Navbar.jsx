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
    <nav className="fixed top-0 left-0 w-full z-40 bg-white/90 backdrop-blur-sm shadow-[0_4px_8px_rgba(0,0,0,0.1)]
 py-2 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-44 cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          {["/", "/doctors", "/about", "/contact"].map((path, index) => (
            <li key={index} className="relative group">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `py-1 transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-gray-800"
                  } hover:text-primary`
                }
              >
                {path === "/" ? "home" : path.slice(1).replace("-", " ")}
              </NavLink>
              <hr className="absolute left-0 bottom-0 w-0 group-hover:w-3/5 transition-all duration-300 h-0.5 bg-primary" />
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            // Profile Dropdown
            <div className="relative group flex items-center gap-2 cursor-pointer">
              <img
                className="w-10 h-10 rounded-full shadow-md object-cover"
                src={userData.image}
                alt="User"
              />
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md py-2 px-4 text-gray-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer py-1"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer py-1"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer py-1"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block hover:scale-105 transition-transform duration-300"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setShowMenu(true)} className="md:hidden">
            <img className="w-6" src={assets.menu_icon} alt="Menu" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
          <img className="w-36" src={assets.logo} alt="Logo" />
          <button onClick={() => setShowMenu(false)}>
            <img className="w-7 cursor-pointer" src={assets.cross_icon} alt="Close" />
          </button>
        </div>
        <ul className="flex flex-col items-center gap-4 mt-6 text-lg font-medium">
          {["/", "/doctors", "/about", "/contact"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              onClick={() => setShowMenu(false)}
              className="px-4 py-2 rounded inline-block hover:bg-gray-100 w-full text-center"
            >
              {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Overlay when Mobile Menu is Open */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
