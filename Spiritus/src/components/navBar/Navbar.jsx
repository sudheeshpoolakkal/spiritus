import React, { useState, useEffect } from 'react';
import { Sun, Moon, LogIn, LogOut, UserPlus, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleAuthPopup = () => setShowAuthPopup(!showAuthPopup);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAuthPopup(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowAuthPopup(false);
    navigate('/login'); // Navigate to the login page
  };

  const handleSignUp = () => {
    setShowAuthPopup(false);
    navigate('/register'); // Navigate to the register page
  };

  return (
    <nav className={`transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white shadow-lg'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-auto" src="/api/placeholder/64/64" alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="#" text="Home" />
                <NavLink href="#" text="About" />
                <NavLink href="#" text="Contact" />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={toggleAuthPopup}
                    className="max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-300"
                    aria-label="User menu"
                    aria-haspopup="true"
                  >
                    <img className="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="" />
                  </button>
                </div>
                {showAuthPopup && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300">
                    {isLoggedIn ? (
                      <>
                        <div className="flex items-center px-4 py-2">
                          <User className="mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">User</span>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                          <LogOut className="inline mr-2" size={16} />
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate('/login')} // Navigate to login page
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                          <LogIn className="inline mr-2" size={16} />
                          Login
                        </button>
                        <button
                          onClick={handleSignUp} // Navigate to register page
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                          <UserPlus className="inline mr-2" size={16} />
                          Sign up
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="#" text="Home" mobile />
            <NavLink href="#" text="About" mobile />
            <NavLink href="#" text="Contact" mobile />
          </div>
          <div className="pt-4 pb-3 border-t border-gray-300 dark:border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="/api/placeholder/40/40" alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">User Name</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">user@example.com</div>
              </div>
              <button
                onClick={toggleDarkMode}
                className="ml-auto flex-shrink-0 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, text, mobile }) => (
  <a
    href={href}
    className={`text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ${mobile ? 'block' : 'hidden md:block'}`}
  >
    {text}
  </a>
);

export default Navbar;
