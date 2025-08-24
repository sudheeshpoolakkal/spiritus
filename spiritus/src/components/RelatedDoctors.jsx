import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function RelatedDoctors({ speciality, docId }) {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-8 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-bold">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-base text-gray-600">
        Browse our extensive list of trusted doctors tailored to your needs.
      </p>

<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-3">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="bg-white rounded-lg shadow transition transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            {/* Image Container */}
            <div className="w-full aspect-square overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.name}
              />
            </div>
            {/* Card Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                {/* Availability */}
                <div className="flex items-center gap-1 text-sm">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.available ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                  <span className={item.available ? 'text-green-600' : 'text-red-600'}>
                    {item.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-300">
                  <FaStar className="text-sm" />
                  <span className="text-xs text-gray-700">
                    {item.rating ? item.rating.toFixed(1) : 'No ratings'}
                  </span>
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors');
          window.scrollTo(0, 0);
        }}
        className="bg-green-600 hover:bg-primary text-white px-10 py-3 rounded-full transition-colors duration-300 mt-8"
      >
        More
      </button>
    </div>
  );
}

export default RelatedDoctors;
