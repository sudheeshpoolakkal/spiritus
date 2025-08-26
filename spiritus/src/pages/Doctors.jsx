import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaStar, FaSearch } from 'react-icons/fa';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const navigate = useNavigate();

  const specialties = [
    'Psychologist',
    'Hypnotherapist',
    'Psychiatrist',
    'Neuropsychologist',
    'Psychoanalyst',
    'SocialWorker',
  ];

  const languages = ['English', 'Malayalam','Tamil','Hindi', 'Telugu', 'Bengali',  'Marathi', 'Spanish', 'French', 'German', 'Mandarin'];

  // Apply filter based on selected speciality
  const applyFilter = () => {
    let filteredDoctors = doctors;

    if (speciality) {
      filteredDoctors = filteredDoctors.filter((doc) => doc.speciality === speciality);
    }

    if (selectedLanguage) {
      filteredDoctors = filteredDoctors.filter((doc) =>
        doc.languages.includes(selectedLanguage)
      );
    }

    if (searchTerm.trim() !== '') {
      filteredDoctors = filteredDoctors.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterDoc(filteredDoctors);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, selectedLanguage, searchTerm]);

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
        <div className="flex flex-col items-center justify-center gap-8 text-gray-900">
          <h1 className="text-3xl font-bold">Find Doctors</h1>
          <p className="sm:w-1/2 text-center text-base text-gray-600">
            Browse our extensive list of trusted doctors tailored to your needs.
          </p>
          
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Search doctors..."
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
              
              <div className={`space-y-4 ${showFilter ? 'block' : 'hidden sm:block'}`}>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">Specialties</p>
                  {specialties.map((spec, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        navigate(`/doctors/${spec}`);
                        setSelectedLanguage('');
                        setSearchTerm('');
                      }}
                      className={`w-full px-3 py-2 text-left text-sm rounded transition-colors ${
                        speciality === spec && !searchTerm
                          ? 'bg-primary text-white font-medium'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      navigate('/doctors');
                      setSelectedLanguage('');
                      setSearchTerm('');
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-primary hover:bg-gray-50 rounded transition-colors"
                  >
                    All Doctors
                  </button>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">Language</p>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-left text-sm rounded transition-colors border border-gray-200"
                  >
                    <option value="">All Languages</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Doctor Cards Grid - Matching RelatedDoctors design */}
          <section className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterDoc.length > 0 ? (
                filterDoc.map((item, index) => {
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
                      key={index}
                      onClick={() => navigate(`/appointment/${item._id}`)}
                      className="bg-white rounded-lg shadow transition transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
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
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-gray-500">
                    {searchTerm ? 
                      `No results for "${searchTerm}"` : 
                      'No doctors available for this specialty'}
                  </p>
                  <button 
                    className="mt-6 px-10 py-3 bg-[#0D8845] hover:bg-black text-white rounded-full transition-colors duration-300"
                    onClick={() => {
                      setFilterDoc(doctors);
                      setSearchTerm('');
                    }}
                  >
                    View All Doctors
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

export default Doctors;