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
    <div className="flex flex-col items-center gap-8 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-semibold">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>
      
      {/* Updated grid with mobile-first approach */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-3">
        {sortedDoctors.slice(0, 10).map((item, index) => (
          <div 
            key={index}
            onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
            className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2 w-full max-w-sm mx-auto"
          >
            <div className="w-full aspect-square overflow-hidden">
              <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
            </div>
            {/* Card Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                {/* Availability Badge */}
                <span className={`flex items-center gap-1 text-xs font-medium ${item.available ? 'text-[#0D8845]' : 'text-red-600'}`}>
                  <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-600' : 'bg-red-600'}`}></span>
                  {item.available ? 'Available' : 'Not Available'}
                </span>
                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-300">
                  <FaStar className="text-sm" />
                  <span className="text-xs text-gray-700">
                    {item.rating ? item.rating.toFixed(1) : 'No ratings'}
                  </span>
                </div>
              </div>
              {/* Doctor Name */}
              <h3 className="text-base font-semibold text-gray-900 mb-1">{item.name}</h3>
              {/* Speciality */}
              <p className="text-xs text-gray-500 uppercase tracking-wide">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }} 
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full transition-colors mt-8"
      >
        More
      </button>
    </div>
  )
}

export default TopDoctors;