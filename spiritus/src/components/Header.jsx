import { assets } from '@/assets/assets_frontend/assets';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bg1 from '@/assets/assets_frontend/bg1.jpg';
import bg2 from '@/assets/assets_frontend/bg2.jpg';
import bg3 from '@/assets/assets_frontend/bg3.jpg';
import bg4 from '@/assets/assets_frontend/bg4.jpg';
import bg5 from '@/assets/assets_frontend/bg5.jpg';
import bg6 from '@/assets/assets_frontend/bg6.jpg';
import bg7 from '@/assets/assets_frontend/bg7.jpeg';
import bg9 from '@/assets/assets_frontend/bg9.jpg';

function Header() {
  const [bgImage, setBgImage] = useState(bg1);

  // Dynamically switch background images every 7 seconds
  useEffect(() => {
    const images = [bg1, bg2, bg4, bg3, bg5, bg6, bg7, bg9];
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
        relative min-h-[80vh] flex flex-col md:flex-row items-center justify-center
        rounded-lg px-6 md:px-10 lg:px-20 bg-cover bg-center bg-no-repeat transition-all duration-1000 overflow-hidden
      "
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      {/* ------ Left Side ------ */}
      <div className="relative z-10 md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-[10vw] text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Book Appointment<br />With Trusted Doctors
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-3 text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="Group Profiles" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            and schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="
            inline-flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm
            shadow-md hover:scale-105 transition-transform duration-300
          "
        >
          Book Appointment <img className="w-3" src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>

      {/* ------ Right Side ------ */}
      <div className="relative z-10 md:w-1/2 mb-8">
        <div className="relative group">
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
    </div>
  );
}

export default Header;
