import { AppContext } from '@/context/AppContext'; // Adjust import path if needed (e.g., '../context/AppContext')
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaAmbulance } from 'react-icons/fa'; // Added FaAmbulance for emergency icon

function TopHospitals() {
  const navigate = useNavigate();
  const { hospitals } = useContext(AppContext);
  
  // Sort hospitals by mentalHealthProfessionals from highest to lowest (proxy for "top")
  const sortedHospitals = [...hospitals].sort((a, b) => (b.mentalHealthProfessionals || 0) - (a.mentalHealthProfessionals || 0));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header Section - Perfectly Centered */}
      <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
          Top Hospitals to Book
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Explore our premium selection of trusted hospitals for your care.
        </p>
      </div>
      
      {/* Hospitals Grid - Centered with proper spacing */}
      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {sortedHospitals.slice(0, 10).map((item, index) => (
            <div 
              key={index}
              onClick={() => { navigate(`/hospital/${item._id}`); window.scrollTo(0, 0); }}
              className="w-full max-w-[200px] bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:scale-105"
            >
              {/* Image Container */}
              <div className="w-full aspect-square overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  src={item.hospitalLogo || 'placeholder-hospital.jpg'} 
                  alt={item.hospitalName}
                  loading="lazy"
                />
                {/* Overlay gradient for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Card Details */}
              <div className="p-3 sm:p-4">
                {/* Emergency Badge and Rating Row */}
                <div className="flex items-center justify-between mb-2 gap-1">
                  {/* Emergency Badge with Icon */}
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${
                    item.emergencySupport === 'yes' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    <FaAmbulance className="text-xs flex-shrink-0" />
                    <span className="hidden sm:inline">
                      {item.emergencySupport === 'yes' ? 'Emergency' : 'No Emergency'}
                    </span>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-400 flex-shrink-0">
                    <FaStar className="text-xs sm:text-sm" />
                    <span className="text-xs text-gray-700">
                      {item.rating ? item.rating.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                </div>
                
                {/* Hospital Name - Centered */}
                <div className="text-center mb-2">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate" title={item.hospitalName}>
                    {item.hospitalName}
                  </h3>
                </div>
                
                {/* Type - Centered */}
                <div className="text-center mb-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wide truncate" title={item.type}>
                    {item.type}
                  </p>
                </div>
                
                {/* Specializations - Centered */}
                <div className="text-center">
                  <p className="text-xs text-gray-600 truncate" title={item.specializations?.join(', ') || 'General'}>
                    {item.specializations && item.specializations.length > 0
                      ? `${item.specializations.slice(0, 2).join(', ')}${item.specializations.length > 2 ? '...' : ''}`
                      : 'General Hospital'
                    }
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Button - Perfectly Centered */}
      <div className="flex justify-center">
        <button 
          onClick={() => { navigate('/hospitals'); window.scrollTo(0, 0); }} 
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base shadow-md hover:shadow-lg font-medium"
        >
          More Hospitals
        </button>
      </div>
    </div>
  );
}

export default TopHospitals;