import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaStar, FaSearch, FaAmbulance, FaMapMarkerAlt } from 'react-icons/fa';

const Hospitals = () => {
  const { hospitalType } = useParams();
  const { hospitals } = useContext(AppContext);
  const [filterHospitals, setFilterHospitals] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const hospitalTypes = [
    { value: 'hospital', label: 'Hospital' },
    { value: 'clinic', label: 'Clinic' },
    { value: 'government', label: 'Government' },
    { value: 'rehab', label: 'Rehabilitation Center' },
    { value: 'counseling', label: 'Counseling Center' },
    { value: 'community', label: 'Community Mental Health Center' },
    { value: 'other', label: 'Other' },
  ];

  const [selectedType, setSelectedType] = useState(hospitalType || 'all');

  // Memoized filter function for better performance
  const applyFilter = useMemo(() => {
    return () => {
      setIsLoading(true);
      let filteredHospitals = hospitals || [];

      // Filter by type
      if (selectedType && selectedType !== 'all') {
        filteredHospitals = filteredHospitals.filter(
          (hospital) => hospital.type?.toLowerCase() === selectedType.toLowerCase()
        );
      }

      // Filter by search term
      if (searchTerm.trim() !== '') {
        const searchLower = searchTerm.toLowerCase();
        filteredHospitals = filteredHospitals.filter(
          (hospital) =>
            hospital.hospitalName?.toLowerCase().includes(searchLower) ||
            hospital.type?.toLowerCase().includes(searchLower) ||
            hospital.district?.toLowerCase().includes(searchLower) ||
            hospital.address?.toLowerCase().includes(searchLower) ||
            (hospital.specializations && Array.isArray(hospital.specializations) && 
             hospital.specializations.some((spec) =>
               spec.toLowerCase().includes(searchLower)
             ))
        );
      }

      setFilterHospitals(filteredHospitals);
      setIsLoading(false);
    };
  }, [hospitals, selectedType, searchTerm]);

  // Apply filters with debounce for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilter();
    }, searchTerm ? 300 : 0);

    return () => clearTimeout(timeoutId);
  }, [applyFilter]);

  // Handle type selection
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSearchTerm('');
    navigate(type === 'all' ? '/hospitals' : `/hospitals/${type}`, { replace: true });
  };

  // Handle navigation with error handling
  const handleHospitalClick = (hospitalId) => {
    if (hospitalId) {
      navigate(`/hospital/${hospitalId}`);
      window.scrollTo(0, 0);
    }
  };

  // Calculate average rating safely
  const calculateRating = (hospital) => {
    if (hospital.rating && typeof hospital.rating === 'number') {
      return hospital.rating.toFixed(1);
    }
    if (hospital.reviews && Array.isArray(hospital.reviews) && hospital.reviews.length > 0) {
      const avgRating = hospital.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / hospital.reviews.length;
      return avgRating.toFixed(1);
    }
    return null;
  };

  // Reset filters
  const resetFilters = () => {
    setFilterHospitals(hospitals || []);
    setSearchTerm('');
    setSelectedType('all');
    navigate('/hospitals', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
          <div className="flex flex-col items-center justify-center gap-6 text-gray-900">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Find Hospitals
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our extensive list of trusted hospitals tailored to your needs.
              </p>
            </div>
            
            {/* Enhanced Search Input */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Search hospitals, locations, specializations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              {isLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-6">
              <button
                className="w-full mb-4 px-4 py-3 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg shadow-sm lg:hidden transition-colors hover:bg-gray-50"
                onClick={() => setShowFilter(!showFilter)}
              >
                {showFilter ? 'Hide Filters' : 'Show Filters'}
                <span className="float-right">{showFilter ? '−' : '+'}</span>
              </button>
              
              <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${showFilter ? 'block' : 'hidden lg:block'}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      Hospital Types
                    </h3>
                    <button
                      onClick={resetFilters}
                      className="text-xs text-green-600 hover:text-green-700 font-medium"
                    >
                      Reset
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    {hospitalTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handleTypeSelect(type.value)}
                        className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-all duration-200 ${
                          selectedType === type.value
                            ? 'bg-green-500 text-white font-medium shadow-sm'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                    <button
                      onClick={() => handleTypeSelect('all')}
                      className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-all duration-200 ${
                        selectedType === 'all'
                          ? 'bg-green-500 text-white font-medium'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      All Hospitals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Enhanced Hospital Cards Grid */}
          <section className="flex-1">
            {/* Results header */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {isLoading ? 'Searching...' : `${filterHospitals.length} hospital${filterHospitals.length !== 1 ? 's' : ''} found`}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterHospitals.length > 0 ? (
                filterHospitals.map((item, index) => {
                  const avgRating = calculateRating(item);
                  
                  return (
                    <div
                      key={item._id || index}
                      onClick={() => handleHospitalClick(item._id)}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-200"
                    >
                      {/* Enhanced Image container */}
                      <div className="w-full aspect-square overflow-hidden relative">
                        <img
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          src={item.hospitalLogo || '/api/placeholder/300/300'}
                          alt={item.hospitalName || 'Hospital'}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/300/300';
                          }}
                        />
                        {/* Emergency badge overlay */}
                        {item.emergencySupport === 'yes' && (
                          <div className="absolute top-3 right-3">
                            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <FaAmbulance className="text-xs" />
                              <span className="hidden sm:inline">24/7</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Card Details */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          {/* Emergency Support Status */}
                          <div className="flex items-center gap-1 text-sm">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                item.emergencySupport === 'yes' ? 'bg-green-500' : 'bg-gray-400'
                              }`}
                            ></span>
                            <span className={`text-xs font-medium ${
                              item.emergencySupport === 'yes' ? 'text-green-600' : 'text-gray-500'
                            }`}>
                              {item.emergencySupport === 'yes' ? 'Emergency' : 'Regular'}
                            </span>
                          </div>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-500 text-sm" />
                            <span className="text-xs font-medium text-gray-700">
                              {avgRating || 'New'}
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.hospitalName || 'Hospital Name'}
                        </h3>
                        
                        <p className="text-xs text-green-600 uppercase tracking-wider font-medium mb-2">
                          {item.type || 'Hospital'}
                        </p>
                        
                        {(item.address || item.district) && (
                          <div className="flex items-start gap-1 mb-2">
                            <FaMapMarkerAlt className="text-gray-400 text-xs mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {[item.address, item.district].filter(Boolean).join(', ')}
                            </p>
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {item.specializations && Array.isArray(item.specializations) && item.specializations.length > 0
                            ? `${item.specializations.slice(0, 2).join(', ')}${
                                item.specializations.length > 2 ? ` +${item.specializations.length - 2} more` : ''
                              }`
                            : 'General Healthcare Services'
                          }
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaSearch className="text-gray-400 text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {searchTerm ? 'No Results Found' : 'No Hospitals Available'}
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      {searchTerm 
                        ? `We couldn't find any hospitals matching "${searchTerm}". Try adjusting your search or filters.`
                        : 'No hospitals are available for the selected type. Please try different filters.'
                      }
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-300 font-medium"
                      onClick={resetFilters}
                    >
                      View All Hospitals
                    </button>
                    {searchTerm && (
                      <button 
                        className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full transition-colors duration-300 font-medium"
                        onClick={() => setSearchTerm('')}
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
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