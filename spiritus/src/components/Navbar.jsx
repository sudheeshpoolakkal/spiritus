import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/90 backdrop-blur-sm shadow-[0_4px_8px_rgba(0,0,0,0.1)] h-[3.25rem] px-4 md:px-8 flex items-center">
        {/* Changed from max-w-[1200px] w-full mx-auto to full width for more control */}
        <div className="w-full flex items-center justify-between">
          {/* Logo + Text Container - moved slightly left with negative margin */}
          <div className="flex items-center h-12 md:-ml-1">
            <img
              onClick={() => navigate("/")}
              style={{ transform: "scale(1.3)" }}
              className="h-full w-auto cursor-pointer object-contain"
              src={assets.logo}
              alt="Logo"
            />
            <div className="flex items-center">
              <span
                onClick={() => navigate("/")}
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  color: "black",
                  fontWeight: 600,
                  fontSize: "1.6rem",
                  transform: "translateY(-2.4px) translateX(-8px)",
                }}
                className="tracking-wide ml-3 cursor-pointer transition-all duration-300 hover:scale-105"
              >
                Spiritus
              </span>
              <span className="ml-2 px-2 py-0.5 text-white text-xs font-bold rounded-full uppercase tracking-wide transform translate-y-[-2px] hover:scale-90 transition-transform duration-200"
      style={{background: 'linear-gradient(89.58deg, #3186FF 0.28%, #346BF0 44.45%, #4EA0FF 99.55%)'}}>
    Beta
</span>
            </div>
          </div>

          {/* Desktop Menu - centered */}
          <ul className="hidden md:flex items-center gap-8 font-medium absolute left-1/2 transform -translate-x-1/2">
            {["/", "/Doctors", "/Awards", "/Application", "/Plans", "/Hospitals", "/About", "/Contact"].map((path, index) => (
              <li key={index} className="relative group">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `py-1 hover:scale-105 transition-all duration-300 ${
                      isActive ? "text-primary" : "text-gray-800"
                    }`
                  }
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 900,
                    fontSize: "1.1rem",
                    transform: "translateY(-2.4px)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {path === "/" ? "Home" : path.slice(1).replace("-", " ")}
                </NavLink>
                <hr className="absolute left-0 bottom-0 w-0 group-hover:w-3/5 transition-all duration-300 h-0.5 bg-primary" />
              </li>
            ))}
          </ul>

          {/* Right Side Container - moved slightly right with positive margin */}
          <div className="flex items-center gap-4 mr-4 md:mr-1">
            {token && userData ? (
              <div className="relative group flex items-center gap-1 md:gap-2 cursor-pointer">
                <img
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md object-cover"
                  src={userData.image}
                  alt="User"
                />
                <div className="absolute right-0 top-10 md:top-12 bg-white shadow-xl rounded-lg py-3 px-4 text-gray-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 min-w-max border border-gray-100">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-black cursor-pointer py-2 whitespace-nowrap hover:bg-gray-50 rounded px-2 -mx-2"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="hover:text-black cursor-pointer py-2 whitespace-nowrap hover:bg-gray-50 rounded px-2 -mx-2"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-red-600 cursor-pointer py-2 hover:bg-red-50 rounded px-2 -mx-2"
                  >
                    Logout
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-primary text-white px-4 md:px-8 py-1.5 md:py-2 rounded-full font-light text-xs md:text-base hidden sm:block hover:scale-105 transition-transform duration-300 shadow-md"
              >
                Create Account
              </button>
            )}
            <button
              onClick={() => setShowMenu(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <img className="w-6 h-6" src={assets.menu_icon} alt="Menu" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-white shadow-2xl transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden border-l border-gray-200`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center h-12">
            <img
              className="h-full w-auto object-contain transform scale-125"
              src={assets.logo}
              alt="Logo"
            />
            <div className="flex items-center">
              <span
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
                className="text-xl font-medium ml-2 text-gray-800"
              >
                Spiritus
              </span>
              <span className="ml-2 px-1.5 py-0.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full uppercase tracking-wide shadow-sm">
                Beta
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowMenu(false)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors"
          >
            <img className="w-6 h-6" src={assets.cross_icon} alt="Close" />
          </button>
        </div>
        <div className="py-6">
          <ul className="flex flex-col gap-1 px-4">
            {["/", "/Doctors", "/Awards", "/Application","/Plans", "/Hospitals", "/About", "/Contact"].map(
              (path, index) => (
                <li key={index} className="w-full">
                  <NavLink
                    to={path}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      `block w-full text-left px-6 py-4 rounded-lg text-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`
                    }
                  >
                    {path === "/" ? "Home" : path.slice(1)}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
        {token && userData && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4 mb-6">
              <img
                className="w-14 h-14 rounded-full shadow-md object-cover border-2 border-white"
                src={userData.image}
                alt="User"
              />
              <div>
                <p className="font-semibold text-gray-800 text-lg">
                  Hello, {userData.name || "User"}!
                </p>
                <p className="text-sm text-gray-600">Manage your account</p>
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  navigate("/my-profile");
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 font-medium"
              >
                👤 My Profile
              </button>
              <button
                onClick={() => {
                  navigate("/my-appointments");
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 font-medium"
              >
                📅 My Appointments
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 hover:shadow-sm rounded-lg transition-all duration-200 font-medium"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
        {!token && (
          <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
            <div className="text-center mb-4">
              <p className="text-gray-600 mb-2">Ready to get started?</p>
            </div>
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="w-full bg-primary text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </div>
        )}
      </div>

      {/* Overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;