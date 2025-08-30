import React from 'react';
import { Link } from 'react-router-dom';

// Data for footer links, making the component easier to manage.
const footerSections = [
  {
    title: 'Services',
    links: [
      { name: 'Intelligence Module', path: '/neha', isHighlighted: true },
      { name: 'Vespera', path: '/vespera', isHighlighted: true },
      { name: 'Online Therapy', path: '/therapy' },
      { name: 'Community', path: '/community' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  },
];

// Define styles once to avoid repetition.
const baseLinkStyle = 'text-xs transition-colors';
const standardLinkStyle = `${baseLinkStyle} text-[#86868b] hover:text-gray-900`;
const highlightedLinkStyle = {
  background: 'linear-gradient(89.58deg, #3186FF 0.28%, #346BF0 44.45%, #4EA0FF 99.55%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f7] py-16">
      <div className="max-w-[980px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-xs text-gray-900 font-semibold mb-4">About Spiritus</h3>
            <p className="text-xs text-[#86868b] leading-relaxed">
              Empowering mental wellness through compassionate care and innovative solutions.
            </p>
          </div>

          {/* Dynamically Generated Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs text-gray-900 font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3"> {/* Increased space-y for better readability */}
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={link.isHighlighted ? `${baseLinkStyle} font-bold` : standardLinkStyle}
                      style={link.isHighlighted ? highlightedLinkStyle : {}}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-xs text-center text-[#100101]">
            Copyright © {new Date().getFullYear()} Spiritus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;