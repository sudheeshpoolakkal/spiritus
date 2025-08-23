import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaStar, FaSearch, FaMapMarkerAlt, FaFilter } from 'react-icons/fa';

const Hospitals = () => {
  const { hospitalType } = useParams();
  const { hospitals } = useContext(AppContext);
  const [filterHospitals, setFilterHospitals] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const hospitalTypes = [
    
    { value: 'all', label: 'All' },
    { value: 'government', label: 'Government' },
    { value: 'hospital', label: 'Hospital' },
    { value: 'clinic', label: 'Clinic' },
    
    { value: 'rehab', label: 'Rehabilitation' },
    { value: 'counseling', label: 'Counseling' },
    { value: 'community', label: 'Community' },
    { value: 'other', label: 'Other' },
  ];

  const [selectedType, setSelectedType] = useState(hospitalType || 'all');

  const applyFilter = () => {
    let filteredHospitals = hospitals;

    if (selectedType && selectedType !== 'all') {
      filteredHospitals = hospitals.filter((hospital) => hospital.type === selectedType);
    }

    if (searchTerm.trim() !== '') {
      filteredHospitals = filteredHospitals.filter(
        (hospital) =>
          hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (hospital.specializations && hospital.specializations.some((spec) =>
            spec.toLowerCase().includes(searchTerm.toLowerCase())
          ))
      );
    }

    setFilterHospitals(filteredHospitals);
  };

  useEffect(() => {
    applyFilter();
  }, [hospitals, hospitalType, searchTerm, selectedType]);

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
  <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
    <div className="py-6 flex flex-col gap-6">
      
      {/* Section Heading */}
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        Healthcare Facilities
      </h1>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        {/* Filter Button (mobile only) */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg 
                     border border-gray-300 bg-white text-sm font-medium text-gray-700 
                     hover:bg-gray-50 transition"
        >
          <FaFilter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>
    </div>
  </div>
</div>


      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
        <div className="flex gap-6">
          {/* Minimal Sidebar */}
          <aside className="hidden sm:block w-40 flex-shrink-0">
            <div className="sticky top-16">
              <div className="space-y-1">
                {hospitalTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedType === type.value
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Dropdown */}
          {showFilter && (
            <div className="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-25" onClick={() => setShowFilter(false)}>
              <div className="bg-white rounded-t-xl mt-20 p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filter by Type</h3>
                  <button onClick={() => setShowFilter(false)} className="text-gray-400">×</button>
                </div>
                <div className="space-y-2">
                  {hospitalTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => {
                        setSelectedType(type.value);
                        setShowFilter(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg ${
                        selectedType === type.value
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Hospital Grid */}
          <section className="flex-1">
            {/* Results count */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                {filterHospitals.length} {filterHospitals.length === 1 ? 'hospital' : 'hospitals'}
              </p>
            </div>

            {filterHospitals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {filterHospitals.map((hospital, index) => {
                  const avgRating =
                    hospital.reviews && hospital.reviews.length > 0
                      ? (hospital.reviews.reduce((sum, review) => sum + review.rating, 0) / hospital.reviews.length).toFixed(1)
                      : null;
                  
                  return (
                    <div
                      key={index}
                      onClick={() => navigate(`/hospital/${hospital._id}`)}
                      className="bg-white border border-gray-130 rounded-sm overflow-hidden cursor-pointer
                               transition-all duration-200 "
                    >
                      {/* Image */}
                      <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={hospital.hospitalLogo || '/api/placeholder/320/200'}
                          alt={hospital.hospitalName}
                          onError={(e) => {
                            e.target.src = '/api/placeholder/320/200';
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900 text-base leading-tight flex-1 mr-2">
                            {hospital.hospitalName}
                          </h3>
                          <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0">
                            <FaStar className="text-sm" />
                            <span className="text-xs text-gray-700">{avgRating || 'No ratings'}</span>
                          </div>
                        </div>

                        {/* Type and Emergency Status */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            {hospital.type}
                          </span>
                          {hospital.emergencySupport === 'yes' && (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                              Emergency
                            </span>
                          )}
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-1.5 mb-3">
                          
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {hospital.address}, {hospital.district}
                          </p><FaMapMarkerAlt className="h-3 w-3 text-green-700 mt-1 flex-shrink-0" />
                        </div>

                        {/* Specializations */}
                        {hospital.specializations && hospital.specializations.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {hospital.specializations.slice(0, 3).map((spec, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                                {spec}
                              </span>
                            ))}
                            {hospital.specializations.length > 3 && (
                              <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded">
                                +{hospital.specializations.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              }
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-sm mx-auto">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hospitals found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm ? 
                      `No results for "${searchTerm}". Try a different search term.` :
                      'No hospitals match your current filter.'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSelectedType('all');
                      setSearchTerm('');
                    }}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                             font-medium transition-colors"
                  >
                    Show all hospitals
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;