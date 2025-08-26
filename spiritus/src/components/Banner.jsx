import { assets } from '@/assets/assets_frontend/assets';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg9 from '@/assets/assets_frontend/bg9.jpg'; // Import your background image
import { Link } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  return (
    <>
<div className="w-full flex justify-center items-center my-8 px-4">
  <div className="text-center space-y-4">
    <p className="text-3xl md:text-4xl italic text-black tracking-wider leading-relaxed" 
       style={{fontFamily: 'Playfair Display, serif'}}>
      "Cleanse your mind and spirit with us, an Abyss is no place to Be."
    </p>
    {/* <p className="text-xl md:text-2xl  text-black tracking-wide leading-relaxed" 
       style={{fontFamily: 'Playfair Display, serif'}} >
      An Abyss is no place to Be
    </p> */}
  </div>
</div>

    <div 
      className="flex flex-col md:flex-row rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg9})` }} // Correct usage of backgroundImage
    >
      {/* ----- Left Side ----- */}
      <div className="flex-1 text-center md:text-left py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => { navigate('/login'); scrollTo(0, 0); }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
          aria-label="Create an account to book an appointment"
        >
          Create Account
        </button>
      </div>

      {/* ----- Right Side ----- */}
      <div className="hidden md:flex md:w-1/2 lg:w-[370px] relative justify-end">
        <img 
          className="w-full h-auto object-cover" 
          src={assets.appointment_img} 
          alt="Doctor Appointment" 
        />
      </div>
    </div>

    {/* Tag  */}

  </>

  );
}

export default Banner;
