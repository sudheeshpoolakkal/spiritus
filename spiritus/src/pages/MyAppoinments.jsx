import { AppContext } from '../context/AppContext';
import React, { useContext } from 'react';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  // Check if doctors array exists and has elements
  if (!doctors || doctors.length === 0) {
    return <p className="text-center text-gray-500">No appointments available</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">My Appointments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative">
              {/* Check if item.image exists */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={`Doctor ${item.name}`}
                  className="w-full h-56 object-cover object-top" // Adjusted height and image position
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name ? item.name : 'Unknown Doctor'}
              </h3>
              <p className="text-gray-600 mt-2">
                {/* Placeholder for additional information */}
                Experienced in mental health therapy.
              </p>
              <button className="mt-4 py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
