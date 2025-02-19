import React from 'react';
import { specialityData } from '@/assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

function SpecialityMenu() {
  return (
    <div id="speciality" className='flex flex-col items-center gap-6 py-16 text-gray-800 bg-white'>
      <h1 className="text-4xl font-semibold">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-lg text-gray-600">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>
      
      <div className='flex sm:justify-center gap-6 pt-5 w-full overflow-x-auto'>
        {specialityData.map((item, index) => (
          <Link 
            key={index} 
            className='flex flex-col items-center text-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-transform duration-300'
            onClick={() => scrollTo(0, 0)} 
            to={`/doctors/${item.speciality}`}
          >
            <img className='w-16 sm:w-24 mb-2 rounded-full shadow-md' src={item.image} alt={item.speciality} />
            <p className="text-lg font-medium text-gray-900">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpecialityMenu;
