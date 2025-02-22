import { assets } from '@/assets/assets_frontend/assets';
import React from 'react';

function Header() {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r  from-hospitalBlue to-hospitalGreen px-6 md:px-10 lg:px-20 overflow-hidden shadow-lg'>
      {/* ------ Right Side (Doctor Image First) ------ */}
      <div className='md:w-1/2 mt-6 relative'>
        <img
          className='w-full md:absolute bottom-0 h-auto rounded-lg transform hover:scale-105 transition-all duration-500'
          src={assets.header_img}
          alt="Doctor Consultation"
        />
      </div>
      
      {/* ------ Left Side (Text Content) ------ */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight md:leading-tight lg:leading-tight animate-fadeIn'>
          Book Appointment<br />With Trusted Doctors
        </p>
        <div className='flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light'>
          <img className='w-28 animate-bounce' src={assets.group_profiles} alt="Trusted Profiles" />
          <p className='max-w-md'>
            Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' />
            and schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className='flex items-center gap-3 bg-white px-8 py-3 rounded-full text-hospitalBlue text-sm font-semibold m-auto md:m-0 hover:scale-105 transition-all duration-300 hover:shadow-lg'
        >
          Book Appointment <img className='w-3 animate-pulse' src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>
    </div>
  );
}

export default Header;