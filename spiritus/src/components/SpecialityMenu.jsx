import React from 'react';
import { specialityData } from '@/assets/assets_frontend/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SpecialityMenu = () => {
  console.log('SpecialityMenu component rendered');
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[980px] mx-auto px-4">
        <motion.h2 
          className="text-4xl font-semibold text-center mb-2"
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Specialized Care
        </motion.h2>
        <motion.p 
          className="text-center text-[#86868b] text-lg mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Expert care for every aspect of your mental health
        </motion.p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {specialityData.map((item, index) => (
            <Link 
              key={index}
              to={`/doctors/${item.speciality}`}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-[#fbfbfd] hover:bg-gray-50 transition-all duration-300"
            >
              <div className="p-6 h-full flex flex-col items-center justify-between text-center">
                <img 
                  src={item.image} 
                  alt={item.speciality}
                  className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110" 
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{item.speciality}</h3>
                  <span className="text-[#0066CC] text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Learn more →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpecialityMenu;
