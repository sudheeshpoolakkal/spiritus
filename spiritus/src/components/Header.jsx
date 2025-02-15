import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '@/assets/assets_frontend/assets';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-white/90 shadow-md' : 'bg-white/80'
      }`}
    >
      <nav className="max-w-[1200px] mx-auto h-[48px] flex items-center justify-between px-8 text-gray-900 text-sm font-light">
        <Link to="/" className="flex items-center">
          <img src={assets.logo} alt="Angelus" className="h-5" />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/services" className="hover:text-gray-500 transition-colors">Services</Link>
          <Link to="/doctors" className="hover:text-gray-500 transition-colors">Find Care</Link>
          <Link to="/support" className="hover:text-gray-500 transition-colors">Support</Link>
          <Link to="/about" className="hover:text-gray-500 transition-colors">About</Link>
          <Link to="/book-appointment" className="hover:text-gray-500 transition-colors">Book Now</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
