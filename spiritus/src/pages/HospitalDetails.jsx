import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

// A simple, reusable spinner component for the loading state.
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// A reusable component to display error messages.
const ErrorDisplay = ({ message }) => (
  <div className="text-center py-10 px-4">
    <p className="text-red-500 bg-red-100 p-4 rounded-lg">{message || "An unexpected error occurred."}</p>
  </div>
);

const HospitalDetails = () => {
  const { hospitalId } = useParams();
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  // State management for data, loading, and error handling.
  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      // Reset states on new fetch
      setLoading(true);
      setError(null);

      try {
        // Fetch hospital and doctor data in parallel for better performance.
        const [hospitalResponse, doctorsResponse] = await Promise.all([
          axios.get(`${backendUrl}/api/user/hospital/${hospitalId}`),
          axios.get(`${backendUrl}/api/user/hospital/${hospitalId}/doctors`),
        ]);

        if (hospitalResponse.data.success) {
          setHospital(hospitalResponse.data.hospital);
        } else {
          throw new Error(hospitalResponse.data.message || 'Failed to fetch hospital details.');
        }

        if (doctorsResponse.data.success) {
          setDoctors(doctorsResponse.data.doctors);
        } else {
          // This is a non-critical error; we can still show the hospital info.
          toast.warn(doctorsResponse.data.message || 'Could not fetch doctors.');
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    // backendUrl is included in the dependency array as it's an external variable.
  }, [hospitalId, backendUrl]);

  // Render a loading spinner while fetching data.
  if (loading) {
    return <LoadingSpinner />;
  }

  // Render an error message if the hospital data failed to load.
  if (error || !hospital) {
    return <ErrorDisplay message={error || 'Sorry, this hospital could not be found.'} />;
  }

  return (
    // A light background color for the entire page to make content pop.
    <div className=" min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
        {/* Hospital Details Header Section with improved padding and visual separation. */}
        <header className="bg-white overflow-hidden mb-12 p-6">
          <h1 className="text-3xl font-bold text-gray-900">{hospital.hospitalName}</h1>
          <p className="text-md text-gray-600 mt-2">{hospital.address}</p>
        </header>

        {/* Doctors Section */}
        <main>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Doctors Available</h2>
          
          {/* Conditional rendering: Show doctors grid or an "empty state" message. */}
          {doctors.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {doctors.map(item => {
                  // Calculate average rating
                  const avgRating =
                    item.reviews && item.reviews.length > 0
                      ? (
                          item.reviews.reduce((sum, review) => sum + review.rating, 0) /
                          item.reviews.length
                        ).toFixed(1)
                      : null;
                  return (
                    <div
                      key={item._id}
                      onClick={() => navigate(`/appointment/${item._id}`)}
                      className="bg-white rounded-lg shadow transition transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer w-60"
                    >
                      {/* Image container - aspect-square */}
                      <div className="w-full aspect-square overflow-hidden rounded-sm">

                        <img
                          className="w-full h-full object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>

                      {/* Card Details - matching RelatedDoctors styling */}
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
                          <div className="flex items-center gap-1 text-yellow-500">
                            <FaStar className="text-sm" />
                            <span className="text-xs text-gray-700">
                              {avgRating || 'No ratings'}
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
                  );
                })}
            </div>
          ) : (
            // A clear message for when no doctors are found.
            <div className="text-center py-10 px-4 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No doctors are currently listed for {hospital.hospitalName}.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HospitalDetails;