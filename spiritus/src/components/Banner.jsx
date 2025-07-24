import { assets } from '@/assets/assets_frontend/assets';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg9 from '@/assets/assets_frontend/bg9.jpg'; // Import your background image
import { Link } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  return (
    <>
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

    <div className="bg-white w-full flex justify-center items-center my-8">
          <div className="relative z-10 w-full max-w-xl px-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-xl p-10 rounded-2xl border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full animate-ping"></div>
                  </div>
                  <p className="text-2xl md:text-3xl font-medium text-slate-100 leading-relaxed italic tracking-wide">
                    "Clean your mind and spirit with us"
                  </p>
                  <div className="mt-8 inline-block px-6 py-2 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                    <Link to={'/login'}><span className="text-cyan-300 text-sm font-medium uppercase tracking-wider">Spiritus Journey</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
    </>

    

    
  );
}

export default Banner;
