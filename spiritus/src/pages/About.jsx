// src/AboutUs.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
      <div className="about-us-container bg-gray-50 min-h-screen flex flex-col">
        {/* Header Section */}
        <section className="header-section bg-gradient-to-r from-purple-600 to-blue-500 text-white py-12">
          <div className="text-center animate-fadeInDown">
            <h1 className="text-4xl font-bold">About Us</h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Learn more about Spiritus and how we're transforming access to mental health care globally.
            </p>
          </div>
        </section>

        {/* Navigation Section */}
        <nav className="nav-section bg-white shadow-lg py-4 animate-fadeInUp delay-200">
          <ul className="flex justify-center space-x-8 text-gray-700">
            <li><a href="#about" className="hover:text-blue-600 transition-colors">About</a></li>
            <li><a href="#careers" className="hover:text-blue-600 transition-colors">Careers</a></li>
            <li><a href="#impact" className="hover:text-blue-600 transition-colors">Social Impact</a></li>
          </ul>
        </nav>

        {/* Content Section */}
        <section className="content-section py-16 px-8 bg-white flex flex-col items-center animate-fadeInUp delay-400">
          <div className="max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Find Yourself in Therapy</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Spiritus was founded in 2024 to remove the traditional barriers to therapy and make mental health care more accessible to everyone.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Today, Spiritus is the world’s largest therapy service — providing professional, affordable, and personalized therapy in a convenient online format.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Our network of over 30,000 licensed therapists has helped millions of people take ownership of their mental health and work towards their personal goals.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              As the unmet need for mental health services continues to grow, Spiritus is committed to expanding access to therapy globally.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
