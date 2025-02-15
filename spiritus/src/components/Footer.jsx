// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f7] py-16">
      <div className="max-w-[980px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xs text-gray-900 font-semibold mb-4">About Angelus</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Empowering mental wellness through compassionate care and innovative solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs text-gray-900 font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/therapy" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Online Therapy</Link></li>
              <li><Link to="/counseling" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Counseling</Link></li>
              <li><Link to="/meditation" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Guided Meditation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs text-gray-900 font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Contact Us</Link></li>
              <li><Link to="/help" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs text-gray-900 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-xs text-[#86868b] hover:text-gray-900 transition-colors">Terms of Service</Link></li>
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
