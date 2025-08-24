import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function TopHospitals() {
  const navigate = useNavigate();
  const { hospitals } = useContext(AppContext);
  
  // Sort hospitals by rating from highest to lowest
  const sortedHospitals = [...hospitals].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 my-12 sm:my-16 text-gray-900 mx-4 sm:mx-6 md:mx-10">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-3">Top Hospitals to Book</h1>
        <p className="text-center text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          Simply browse through our extensive list of trusted hospitals.
        </p>
      </div>
      
      {/* Fixed grid with consistent card sizing */}
      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {sortedHospitals.slice(0, 10).map((item, index) => (
          <div 
            key={index}
            onClick={() => { navigate(`/hospital/${item._id}`); window.scrollTo(0, 0); }}
            className="bg-white shadow-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg max-w-xs mx-auto w-full"
          >
            {/* Fixed aspect ratio image container */}
            <div className="w-full aspect-square overflow-hidden bg-gray-100">
              <img 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                src={item.hospitalLogo || 'placeholder-hospital.jpg'} 
                alt={item.hospitalName}
                loading="lazy"
              />
            </div>
            
            {/* Card Details with fixed height */}
            <div className="p-2 sm:p-3 h-20 sm:h-24 flex flex-col justify-between">
              <div className="flex items-start justify-between mb-1">
                {/* Emergency Support Badge */}
                <span className={`flex items-center gap-1 text-xs font-medium flex-shrink-0 ${
                  item.emergencySupport === 'yes' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    item.emergencySupport === 'yes' ? 'bg-green-600' : 'bg-red-600'
                  }`}></span>
                  <span className="hidden sm:inline">
                    {item.emergencySupport === 'yes' ? 'Emergency' : 'No Emergency'}
                  </span>
                </span>
                
                {/* Rating */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <FaStar className="text-yellow-400 text-xs" />
                  <span className="text-xs text-gray-600">
                    {item.rating ? item.rating.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
              
              {/* Hospital Info */}
              <div className="min-h-0 flex-1">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-1" title={item.hospitalName}>
                  {item.hospitalName}
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide line-clamp-1" title={item.type}>
                  {item.type}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => { navigate('/hospitals'); window.scrollTo(0, 0); }} 
        className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-colors mt-4 sm:mt-8 text-sm sm:text-base font-medium"
      >
        More Hospitals
      </button>
    </div>
  );
}

export default TopHospitals;