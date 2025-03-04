import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  return (
    <div className="p-5 max-h-[90vh] overflow-y-auto w-full">
      <h1 className="text-xl font-semibold text-gray-700 mb-4">All Doctors</h1>

      {/* Responsive Grid of Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-sm 
                       hover:shadow-md transition cursor-pointer group"
          >
            {/* Image Section */}
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-48 object-cover transition-all duration-300"
              />
            </div>

            {/* Info Section */}
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800 mb-1 
                            group-hover:text-primary transition-colors">
                {doctor.name}
              </p>
              <p className="text-sm text-gray-500">{doctor.speciality}</p>

              {/* Improved Availability Toggle */}
              <label className="mt-3 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={doctor.available}
                  onChange={() => changeAvailability(doctor._id)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-md 
                                peer-checked:bg-primary peer-checked:border-primary 
                                flex items-center justify-center transition-colors duration-200">
                  <svg
                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">Available</p>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;