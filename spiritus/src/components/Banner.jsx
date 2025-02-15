import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-[980px] mx-auto px-4 text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-semibold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Take the first step towards better mental health
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Start your journey to wellness with our expert therapists
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            to="/book-appointment"
            className="inline-flex items-center justify-center text-lg font-medium bg-white text-black rounded-full px-8 py-4 hover:bg-gray-100 transition-colors"
          >
            Book Your First Session
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;