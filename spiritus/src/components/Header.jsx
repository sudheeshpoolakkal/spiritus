import { assets } from '@/assets/assets_frontend/assets';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bg1 from '@/assets/assets_frontend/bg1.jpg';
import bg2 from '@/assets/assets_frontend/bg2.jpg';
import bg3 from '@/assets/assets_frontend/bg3.jpg';
import bg4 from '@/assets/assets_frontend/bg10.jpg';
import bg5 from '@/assets/assets_frontend/bg5.jpg';
import bg6 from '@/assets/assets_frontend/bg6.jpg';
import bg7 from '@/assets/assets_frontend/bg7.jpg';
import bg8 from '@/assets/assets_frontend/bg8.jpg';
import bg9 from '@/assets/assets_frontend/bg12.jpg';
import bg10 from '@/assets/assets_frontend/bg4.jpg';
import bg11 from '@/assets/assets_frontend/bg11.jpg';



function Header() {
  const [bgImage, setBgImage] = useState(bg1);

  // Dynamically switch background images every 3 seconds
  useEffect(() => {
    const images = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setBgImage(images[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
  className="
    relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[70vh] lg:min-h-[80vh] 
    flex flex-col md:flex-row items-center justify-center
    rounded-lg px-6 sm:px-8 md:px-10 lg:px-20 
    -mt-1 sm:-mt-1 md:-mt-2 lg:-mt-3  
    bg-cover bg-center bg-no-repeat transition-all duration-1000 overflow-hidden
  "
  style={{
    backgroundImage: `url(${bgImage})`,
  }}
>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      {/* ------ Left Side ------ */}
      <div className="relative z-10 md:w-1/2 flex flex-col items-center md:items-start justify-center gap-6 sm:gap-8 py-8 sm:py-10 md:py-[10vw] text-white text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-lg">
          Book Appointment<br />With Trusted Doctors
        </h1>
        <div className="flex flex-col items-center md:items-start gap-4 text-sm sm:text-base md:text-sm font-light max-w-md">
          <img className="w-28 sm:w-32 md:w-28" src={assets.group_profiles} alt="Group Profiles" />
          <p className="text-center md:text-left leading-relaxed">
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            and schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="
            inline-flex items-center gap-2 bg-white px-8 sm:px-10 py-3 sm:py-4 rounded-full 
            text-gray-600 text-sm sm:text-base font-medium shadow-lg hover:scale-105 transition-transform duration-300
          "
        >
          Book Appointment <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>

      {/* ------ Right Side ------ */}
      <div className="relative z-10 md:w-1/2 mb-8">
        
      </div>
    </div>
  );
}

export default Header;