import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaStar, FaSearch } from 'react-icons/fa';

const Hospitals = () => {
  const { hospitalType } = useParams();
  const { hospitals } = useContext(AppContext);
  const [filterHospitals, setFilterHospitals] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const hospitalTypes = [
    'Public',
    'Private',
    'Non-profit',
    'Specialty',
    'Rehabilitation',
    'Community',
    'Government',
    'Clinic',
    'Other'
  ];

  // Apply filter based on selected hospital type
  const applyFilter = () => {
    if (hospitalType) {
      setFilterHospitals(hospitals.filter((hospital) => hospital.type === hospitalType));
    } else {
      setFilterHospitals(hospitals);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [hospitals, hospitalType]);

  // Filter hospitals based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      applyFilter();
      return;
    }
    
    const filtered = hospitals.filter(
      (hospital) => 
        hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        hospital.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilterHospitals(filtered);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
        <div className="flex flex-col items-center justify-center gap-8 text-gray-900">
          <h1 className="text-3xl font-bold">Find Hospitals</h1>
          <p className="sm:w-1/2 text-center text-base text-gray-600">
            Browse our extensive list of trusted hospitals tailored to your needs.
          </p>
          
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Search hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Minimal Sidebar */}
          <aside className="w-full sm:w-48 shrink-0">
            <div className="sm:sticky sm:top-6">
              <button
                className="w-full mb-3 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded sm:hidden"
                onClick={() => setShowFilter(!showFilter)}
              >
                {showFilter ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <div className={`space-y-1 ${showFilter ? 'block' : 'hidden sm:block'}`}>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">Hospital Types</p>
                {hospitalTypes.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFilterHospitals(hospitals.filter((hospital) => hospital.type === type.toLowerCase()));
                      setSearchTerm('');
                    }}
                    className={`w-full px-3 py-2 text-left text-sm rounded transition-colors ${
                      filterHospitals.length > 0 && 
                      filterHospitals[0].type === type.toLowerCase() && 
                      !searchTerm ? 
                      'bg-primary text-white font-medium' : 
                      'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setFilterHospitals(hospitals);
                    setSearchTerm('');
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-primary hover:bg-gray-50 rounded transition-colors"
                >
                  All Hospitals
                </button>
              </div>
            </div>
          </aside>

          {/* Hospital Cards Grid - Matching Doctors design */}
          <section className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterHospitals.length > 0 ? (
                filterHospitals.map((item, index) => {
                  // Calculate average rating (if reviews are implemented)
                  const avgRating =
                    item.reviews && item.reviews.length > 0
                      ? (
                          item.reviews.reduce((sum, review) => sum + review.rating, 0) /
                          item.reviews.length
                        ).toFixed(1)
                      : null;
                  
                  return (
                    <div
                      key={index}
                      onClick={() => navigate(`/hospital/${item._id}`)}
                      className="bg-white rounded-lg shadow transition transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                    >
                      {/* Image container - aspect-square */}
                      <div className="w-full aspect-square overflow-hidden rounded-sm">
                        <img
                          className="w-full h-full object-cover"
                          src={item.hospitalLogo || '/placeholder-hospital.jpg'}
                          alt={item.hospitalName}
                        />
                      </div>

                      {/* Card Details - matching Doctors styling */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          {/* Emergency Support as Availability */}
                          <div className="flex items-center gap-1 text-sm">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                item.emergencySupport === 'yes' ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            ></span>
                            <span className={item.emergencySupport === 'yes' ? 'text-green-600' : 'text-red-600'}>
                              {item.emergencySupport === 'yes' ? 'Emergency Available' : 'No Emergency'}
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
                          {item.hospitalName}
                        </h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                          {item.type}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {item.address}, {item.district}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.specializations && item.specializations.length > 0
                            ? `${item.specializations.slice(0, 2).join(', ')}${
                                item.specializations.length > 2 ? '...' : ''
                              }`
                            : 'General Hospital'
                          }
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-gray-500">
                    {searchTerm ? 
                      `No results for "${searchTerm}"` : 
                      'No hospitals available for this type'}
                  </p>
                  <button 
                    className="mt-6 px-10 py-3 bg-[#0D8845] hover:bg-black text-white rounded-full transition-colors duration-300"
                    onClick={() => {
                      setFilterHospitals(hospitals);
                      setSearchTerm('');
                    }}
                  >
                    View All Hospitals
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;