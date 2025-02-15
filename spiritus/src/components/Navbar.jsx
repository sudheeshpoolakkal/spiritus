import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md' 
          : 'bg-black/95'
      }`}
    >
      <nav className="w-full h-[44px] flex items-center justify-between px-4"> {/* Removed max-w and mx-auto */}
        {/* Left section - Logo */}
        <div className="flex-shrink-0"> {/* Removed w-[160px] and ml-0 */}
          <Link to="/" className="flex items-center">
            <img src={assets.logo} alt="Logo" className="h-[20px]" />
          </Link>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex items-center space-x-7">
            <NavLink
              to="/alldoctors"
              className={`text-[12px] font-normal transition-colors ${
                location.pathname === '/alldoctors' 
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              All Doctors
            </NavLink>
            <NavLink
              to="/about"
              className={`text-[12px] font-normal transition-colors ${
                location.pathname === '/about'
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={`text-[12px] font-normal transition-colors ${
                location.pathname === '/contact'
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </NavLink>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {token && userData ? (
            <div className="relative group">
              <img
                className="w-7 h-7 rounded-full object-cover cursor-pointer"
                src={userData.image}
                alt="Profile"
              />
              <div className="absolute top-full right-0 mt-1 w-48 bg-[#1d1d1f]/90 backdrop-blur-md rounded-lg shadow-lg hidden group-hover:block">
                <div className="py-1">
                  <Link
                    to="/my-profile"
                    className="block px-4 py-2 text-[12px] text-gray-300 hover:text-white hover:bg-[#333336]"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/my-appointments"
                    className="block px-4 py-2 text-[12px] text-gray-300 hover:text-white hover:bg-[#333336]"
                  >
                    My Appointments
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-[12px] text-gray-300 hover:text-white hover:bg-[#333336]"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:inline-flex px-3 py-1 text-[12px] font-normal text-white bg-[#0071e3] rounded-full hover:bg-[#0077ED] transition-colors"
            >
              Create Account
            </button>
          )}

          {/* Mobile menu button */}
          <button 
            onClick={() => setShowMenu(true)}
            className="md:hidden text-white"
          >
            <img 
              className="w-5" 
              src={assets.menu_icon} 
              alt="Menu" 
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#1d1d1f]/95 backdrop-blur-md transition-transform duration-300 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-[44px]">
          <img src={assets.logo} alt="Logo" className="h-[20px]" />
          <button 
            onClick={() => setShowMenu(false)}
            className="text-white"
          >
            <img className="w-5" src={assets.cross_icon} alt="Close" />
          </button>
        </div>
        <div className="px-4 py-6">
          <div className="flex flex-col space-y-4">
            {['Home', 'All Doctors', 'About', 'Contact'].map((item) => (
              <NavLink
                key={item}
                onClick={() => setShowMenu(false)}
                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                className="text-[17px] text-gray-300 hover:text-white"
              >
                {item}
              </NavLink>
            ))}
            {!token && (
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate('/login');
                }}
                className="inline-flex px-3 py-1 text-[12px] font-normal text-white bg-[#0071e3] rounded-full hover:bg-[#0077ED] transition-colors w-fit mt-4"
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
