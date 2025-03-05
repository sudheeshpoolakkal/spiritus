import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f7] py-16">
      <div className="max-w-[980px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xs text-gray-900 font-semibold mb-4">About Spiritus</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Empowering mental wellness through compassionate care and innovative solutions.
            </p>
          </div>

          <div>
            <h4 className="text-xs text-gray-900 font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><p className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Online Therapy</p></li>
              <li><p className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Community</p></li>
              
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-gray-900 font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-gray-900 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><p to="/privacy" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Privacy Policy</p></li>
              <li><p to="/terms" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Terms of Service</p></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-xs text-[#86868b] text-center">
            Copyright © {new Date().getFullYear()} Angelus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;