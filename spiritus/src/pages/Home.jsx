// src/components/Home/Home.js
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import img1 from '../assets/individual.jpeg';
import img2 from '../assets/couples.jpeg';
import img3 from '../assets/teen.jpeg';

const therapyOptions = [
  {
    id: 1,
    title: 'Individual',
    description: 'For myself',
    image: img1,
    delay: 0.2,
    link: '/individual',
  },
  {
    id: 2,
    title: 'Couples',
    description: 'For me and my partner',
    image: img2,
    delay: 0.4,
    link: '/couples',
  },
  {
    id: 3,
    title: 'Teen',
    description: 'For my child',
    image: img3,
    delay: 0.6,
    link: '/teen',
  },
];

function Home() {
  return (
    <>
      
      <motion.div
        className="bg-white dark:bg-gray-800 min-h-screen py-16 pt-24 text-center text-black dark:text-gray-200 transition-colors duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main Heading with Fade-In Animation */}
        <motion.h1
          className="text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          You deserve to be happy.
        </motion.h1>
        
        {/* Subheading with Fade-In Animation */}
        <motion.p
          className="text-xl mb-12 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          What type of therapy are you looking for?
        </motion.p>
        
        {/* Therapy Cards Container */}
        <div className="flex flex-wrap justify-center gap-8 px-4">
          {therapyOptions.map(option => (
            <motion.div
              key={option.id}
              className="relative bg-[#06d6a0] dark:bg-[#047e71] hover:bg-[#0ad6a0] dark:hover:bg-[#059d87] 
                         text-white dark:text-gray-200 rounded-lg p-8 w-full max-w-sm 
                         transform transition-transform duration-500 hover:scale-105 
                         shadow-lg hover:shadow-2xl overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: option.delay, duration: 0.5 }}
            >
              {/* Image Container with Gradient Overlay */}
              <div className="relative">
                <img
                  src={option.image}
                  alt={`${option.title} Therapy`}
                  className="w-32 h-32 mx-auto mb-4 object-cover rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg"
                  width="128"
                  height="128"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-25 rounded-full"></div>
              </div>
              
              <h2 className="text-3xl font-bold mb-2">{option.title}</h2>
              <p className="text-lg mb-4">{option.description}</p>
              <a href={option.link}>
                <button
                  className="bg-white text-[#06d6a0] dark:text-[#047e71] font-bold py-2 px-6 
                             rounded-full shadow-md transition-all duration-300 
                             hover:bg-transparent hover:text-white hover:border-2 hover:border-white 
                             focus:outline-none focus:ring-2 focus:ring-[#06d6a0]"
                  aria-label={`Learn more about ${option.title} therapy`}
                >
                  Learn More →
                </button>
              </a>
            </motion.div>
          ))}
        </div>
        {/* Add the More Details */}
        
      </motion.div>
      <Footer />
    </>
  );
}

export default Home;
