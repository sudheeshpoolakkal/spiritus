// Footer.jsx
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-600">
              At Spiritus, we are committed to providing top-notch mental health care solutions. Our mission is to enhance the well-being of our community through innovative and compassionate care.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-900 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-900 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gray-900 transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-900 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="mr-2 text-gray-600" />
                <span>123 Health St., Wellness City, HC 45678</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-gray-600" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-gray-600" />
                <span>info@healthplus.com</span>
              </li>
            </ul>
          </div>
          
          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>
        
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Spiritus. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
