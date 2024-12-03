

import React from 'react';
import { motion } from 'framer-motion';
import Img1 from "../assets/individual.jpeg"
import Img2 from "../assets/couples.jpeg"
import Img3 from "../assets/teen.jpeg"
import Header from '@/components/Header';
import SpecialityMenu from '@/components/SpecialityMenu';
import TopDoctors from '@/components/TopDoctors';
import Banner from '@/components/Banner';





const therapyOptions = [
  {
    id: 1,
    title: 'Individual',
    description: 'For myself',
    image:Img1,
    delay: 0.2,
    link: '/individual',
  },
  {
    id: 2,
    title: 'Couples',
    description: 'For me and my partner',
    image:Img2,
    delay: 0.4,
    link: '/couples',
  },
  {
    id: 3,
    title: 'Teen',
    description: 'For my child',
    image:Img3,
    delay: 0.6,
    link: '/teen',
  },
];

function Home() {
  return (
    <>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
      
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
        
        <div className="flex flex-wrap justify-center gap-8">
          {/* Individual Therapy Card */}
          <div className="bg-[#3a5f3f] dark:bg-[#2e4731] hover:bg-[#4a6f4f] dark:hover:bg-[#3e5f3f] text-white dark:text-gray-200 rounded-lg p-8 w-full max-w-sm transform transition-transform duration-500 hover:scale-105 shadow-lg hover:shadow-2xl">
            <img src={img1} alt="Individual Therapy" className="w-32 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold mb-2">Individual</h2>
            <p className="text-lg mb-4">For myself</p>
            <button className="bg-white text-[#3a5f3f] dark:text-[#2e4731] font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
              Learn More →
            </button>
          </div>

          {/* Couples Therapy Card */}
          <div className="bg-[#355b5b] dark:bg-[#274949] hover:bg-[#466d6d] dark:hover:bg-[#375c5c] text-white dark:text-gray-200 rounded-lg p-8 w-full max-w-sm transform transition-transform duration-500 hover:scale-105 shadow-lg hover:shadow-2xl">
            <img src={img2} alt="Couples Therapy" className="w-32 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold mb-2">Couples</h2>
            <p className="text-lg mb-4">For me and my partner</p>
            <button className="bg-white text-[#355b5b] dark:text-[#274949] font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
              Learn More →
            </button>
          </div>

          {/* Teen Therapy Card */}
          <div className="bg-[#ba642b] dark:bg-[#8b4f1a] hover:bg-[#d07534] dark:hover:bg-[#a65c25] text-white dark:text-gray-200 rounded-lg p-8 w-full max-w-sm transform transition-transform duration-500 hover:scale-105 shadow-lg hover:shadow-2xl">
            <img src={img3} alt="Teen Therapy" className="w-32 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold mb-2">Teen</h2>
            <p className="text-lg mb-4">For my child</p>
            <button className="bg-white text-[#ba642b] dark:text-[#8b4f1a] font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
              Learn More →
            </button>
          </div>
        </div>
        {/* Add the More Details */}
        
      </motion.div>
    </>
  );
}

export default Home;
