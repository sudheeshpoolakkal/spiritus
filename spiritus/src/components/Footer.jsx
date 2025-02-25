import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* ----- About Section ----- */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">About Spiritus</h3>
            <p className="text-gray-400">
              Providing innovative and compassionate mental health care solutions to enhance the well-being of our community.
            </p>
          </div>
          
          {/* ----- Quick Links ----- */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="hover:text-white transition-all duration-300 block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* ----- Contact Information ----- */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center">
                <MapPin className="mr-2 text-blue-500" />
                <span>123 Wellness Street, HC 45678</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-blue-500" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-blue-500" />
                <span>support@spiritus.com</span>
              </li>
            </ul>
          </div>
          
          {/* ----- Follow Us ----- */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, link: "https://facebook.com" },
                { icon: Twitter, link: "https://twitter.com" },
                { icon: Instagram, link: "https://instagram.com" },
                { icon: Linkedin, link: "https://linkedin.com" }
              ].map(({ icon: Icon, link }, index) => (
                <a key={index} href={link} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

        </div>
        
        {/* ----- Divider Line ----- */}
        <div className="border-t border-gray-700 my-8"></div>
        
        {/* ----- Footer Bottom Section ----- */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Spiritus. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-all duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-all duration-300">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
