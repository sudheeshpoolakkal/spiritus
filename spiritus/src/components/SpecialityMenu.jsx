import React from 'react';
import { specialityData } from '@/assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

function SpecialityMenu() {
  return (
    <div id="speciality" className='py-20 bg-gradient-to-b from-white to-gray-50'>
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Find by Speciality
      </h1>
      <p className="sm:w-1/3 mx-auto text-center text-lg text-gray-600 mb-12">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>
      
      <div className='container mx-auto px-8'>
        <div className='flex flex-col space-y-12'>
          {/* First Row */}
          <div className='flex justify-center space-x-12'>
            {specialityData.slice(0, 3).map((item, index) => (
              <Link 
                key={index} 
                className='group relative'
                to={`/doctors/${item.speciality}`}
              >
                <div className='w-64 h-64 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300'>
                  <img 
                    className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300' 
                    src={item.image} 
                    alt={item.speciality} 
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'>
                    <div className='absolute bottom-0 left-0 right-0 p-6 text-center'>
                      <p className='text-white text-2xl font-semibold'>{item.speciality}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Second Row */}
          <div className='flex justify-center space-x-12'>
            {specialityData.slice(3, 6).map((item, index) => (
              <Link 
                key={index + 3}
                className='group relative'
                to={`/doctors/${item.speciality}`}
              >
                <div className='w-64 h-64 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300'>
                  <img 
                    className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300' 
                    src={item.image} 
                    alt={item.speciality} 
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'>
                    <div className='absolute bottom-0 left-0 right-0 p-6 text-center'>
                      <p className='text-white text-2xl font-semibold'>{item.speciality}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialityMenu;