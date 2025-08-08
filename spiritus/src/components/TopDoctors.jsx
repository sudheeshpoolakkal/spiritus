import { AppContext } from '@/context/AppContext'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

function TopDoctors() {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  
  // Sort doctors by rating from highest to lowest
  const sortedDoctors = [...doctors].sort((a, b) => (b.rating || 0) - (a.rating || 0))

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 my-12 sm:my-16 text-gray-900 mx-4 sm:mx-6 md:mx-10">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-3">Top Doctors to Book</h1>
        <p className="text-center text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>
      
      {/* Mobile: 2 columns, Small: 2 columns, Medium: 3 columns, Large: 4 columns, XL: 5 columns */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {sortedDoctors.slice(0, 10).map((item, index) => (
          <div 
            key={index}
            onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
          >
            <div className="w-full aspect-square overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src={item.image} 
                alt={item.name}
                loading="lazy"
              />
            </div>
            {/* Card Details */}
            <div className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                {/* Availability Badge */}
                <span className={`flex items-center gap-1 text-xs font-medium ${item.available ? 'text-[#0D8845]' : 'text-red-600'}`}>
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 ${item.available ? 'bg-green-600' : 'bg-red-600'}`}></span>
                  <span className="truncate">
                    {item.available ? 'Available' : 'Not Available'}
                  </span>
                </span>
                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-300 flex-shrink-0">
                  <FaStar className="text-xs sm:text-sm" />
                  <span className="text-xs text-gray-700">
                    {item.rating ? item.rating.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
              {/* Doctor Name */}
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 truncate" title={item.name}>
                {item.name}
              </h3>
              {/* Speciality */}
              <p className="text-xs text-gray-500 uppercase tracking-wide truncate" title={item.speciality}>
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }} 
        className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-colors mt-4 sm:mt-8 text-sm sm:text-base"
      >
        More
      </button>
    </div>
  )
}

export default TopDoctors;