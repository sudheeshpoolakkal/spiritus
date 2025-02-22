import { assets } from '@/assets/assets_frontend/assets';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-hospitalBlue to-hospitalGreen rounded-2xl px-6 sm:px-12 md:px-16 lg:px-20 py-12 my-16 md:mx-10 items-center shadow-lg">
      {/* Left Side */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Book Appointment
        </h2>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-200 font-medium">
          With 100+ Trusted Doctors
        </p>
        <button
          onClick={() => { navigate('/login'); scrollTo(0, 0); }}
          className="bg-white text-gray-700 text-base sm:text-lg font-medium px-6 py-3 rounded-full mt-6 transition-transform transform hover:scale-105 hover:shadow-md"
          aria-label="Create an account to book an appointment"
        >
          Create Account
        </button>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:w-1/2 lg:w-[380px] relative justify-end">
        <img 
          className="w-full h-auto object-cover rounded-xl" 
          src={assets.appointment_img} 
          alt="Doctor Appointment" 
        />
      </div>
    </div>
  );
}

export default Banner;
