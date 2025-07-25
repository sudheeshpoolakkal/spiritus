import React from 'react';
import { Link } from 'react-router-dom';
import { FaBrain, FaStethoscope, FaCommentMedical, FaUsers } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { MdChildCare } from 'react-icons/md';

// Updated speciality data
const specialityData = [
  { speciality: 'Clinical Psychology' },
  { speciality: 'Psychiatric Care' },
  { speciality: 'Therapy Sessions' },
  { speciality: 'Teen Therapy' },
  { speciality: 'Family & Relationships' },
  { speciality: 'Mental Wellness Coaching' },
];

// Updated icon mapping with a new icon for Teen Therapy
const iconMapping = {
  'Clinical Psychology': <FaBrain className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />,
  'Psychiatric Care': <FaStethoscope className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />,
  'Therapy Sessions': <FaCommentMedical className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />,
  'Family & Relationships': <FaUsers className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />,
  'Mental Wellness Coaching': <HiAcademicCap className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" />,
  'Teen Therapy': <MdChildCare className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
};

function SpecialityMenu() {
  return (
    <div id="speciality" className="flex flex-col items-center gap-6 py-16 bg-gray-50">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Specialized Care Categories</h1>
        <p className="text-base sm:text-lg text-gray-600">
          Connect with experts across various mental health disciplines tailored to your specific needs.
        </p>
      </div>
      
      {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: 6 columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 pt-8 w-full max-w-7xl px-4">
        {specialityData.map((item, index) => (
          <Link 
            key={index} 
            // to={`/doctors/${encodeURIComponent(item.speciality)}`}
            // onClick={() => window.scrollTo(0, 0)}
            className="group flex flex-col items-center text-center cursor-pointer p-3 sm:p-4 rounded-lg bg-white hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2 sm:mb-3 rounded-full bg-gradient-to-br from-gray-50 to-white group-hover:scale-110 transition-transform">
              {iconMapping[item.speciality]}
            </div>
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpecialityMenu;