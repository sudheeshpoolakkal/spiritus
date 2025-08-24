import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FaStar, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaAmbulance, 
  FaClock, 
  FaUserMd, 
  FaBed, 
  FaHeart,
  FaArrowLeft,
  FaShare,
  FaBookmark,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';

const HospitalDetails = () => {
  const { hospitalId } = useParams();
  const { backendUrl } = useContext(AppContext);
  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const fetchHospitalDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/hospital/${hospitalId}`);
      if (data.success) {
        setHospital(data.hospital);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHospitalDoctors = async () => {
    try {
      setDoctorsLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/hospital/${hospitalId}/doctors`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDoctorsLoading(false);
    }
  };

  useEffect(() => {
    if (hospitalId) {
      fetchHospitalDetails();
      fetchHospitalDoctors();
    }
  }, [hospitalId]);

  // Calculate average rating
  const calculateRating = () => {
    if (hospital?.rating && typeof hospital.rating === 'number') {
      return hospital.rating.toFixed(1);
    }
    if (hospital?.reviews && Array.isArray(hospital.reviews) && hospital.reviews.length > 0) {
      const avgRating = hospital.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / hospital.reviews.length;
      return avgRating.toFixed(1);
    }
    return null;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="bg-white rounded-xl p-8 mb-8">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg p-4">
                      <div className="aspect-square bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHeart className="text-gray-400 text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Hospital Not Found</h3>
          <p className="text-gray-500 mb-6">The hospital you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/hospitals')}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors font-medium"
          >
            Browse All Hospitals
          </button>
        </div>
      </div>
    );
  }

  const avgRating = calculateRating();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'doctors', label: `Doctors (${doctors.length})` },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/hospitals')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <FaArrowLeft />
            <span>Back to Hospitals</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="relative">
            {/* Hospital Image */}
            <div className="h-64 sm:h-80 overflow-hidden bg-gradient-to-r from-green-400 to-green-600">
              {hospital.hospitalLogo ? (
                <img 
                  src={hospital.hospitalLogo} 
                  alt={hospital.hospitalName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaHeart className="text-white text-6xl opacity-50" />
                </div>
              )}
              
              {/* Action buttons overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                  <FaShare />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                  <FaBookmark />
                </button>
              </div>
            </div>

            {/* Hospital Info */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        {hospital.hospitalName}
                      </h1>
                      <p className="text-green-600 font-semibold uppercase tracking-wide text-sm mb-2">
                        {hospital.type}
                      </p>
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <FaMapMarkerAlt className="text-sm" />
                        <span className="text-sm">{hospital.address}, {hospital.district}</span>
                      </div>
                    </div>
                    
                    {/* Emergency badge */}
                    {hospital.emergencySupport === 'yes' && (
                      <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <FaAmbulance className="text-xs" />
                        <span>24/7 Emergency</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {avgRating && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                          <FaStar />
                          <span className="font-bold text-gray-900">{avgRating}</span>
                        </div>
                        <p className="text-xs text-gray-600">Rating</p>
                      </div>
                    )}
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center text-green-500 mb-1">
                        <FaUserMd className="text-xl" />
                      </div>
                      <p className="font-bold text-gray-900">{doctors.length}</p>
                      <p className="text-xs text-gray-600">Doctors</p>
                    </div>
                    {hospital.totalBeds && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center text-blue-500 mb-1">
                          <FaBed className="text-xl" />
                        </div>
                        <p className="font-bold text-gray-900">{hospital.totalBeds}</p>
                        <p className="text-xs text-gray-600">Beds</p>
                      </div>
                    )}
                    {hospital.established && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center text-purple-500 mb-1">
                          <FaClock className="text-xl" />
                        </div>
                        <p className="font-bold text-gray-900">{hospital.established}</p>
                        <p className="text-xs text-gray-600">Established</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About Hospital</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {hospital.description || `${hospital.hospitalName} is a ${hospital.type.toLowerCase()} committed to providing excellent healthcare services to the community. We offer comprehensive medical care with state-of-the-art facilities and experienced medical professionals.`}
                  </p>
                </div>

                {hospital.specializations && hospital.specializations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {hospital.specializations.map((spec, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {hospital.emergencySupport === 'yes' ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaTimesCircle className="text-gray-400" />
                        )}
                        <span className="text-sm text-gray-700">24/7 Emergency Services</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-sm text-gray-700">Qualified Medical Staff</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-sm text-gray-700">Modern Equipment</span>
                      </div>
                    </div>
                  </div>

                  {hospital.workingHours && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Working Hours</h3>
                      <p className="text-gray-600">{hospital.workingHours}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Doctors Tab */}
            {activeTab === 'doctors' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Our Medical Team ({doctors.length})
                  </h3>
                </div>

                {doctorsLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                          <div className="aspect-square bg-gray-200 rounded mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
                          <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : doctors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map(doctor => (
                      <div 
                        key={doctor._id} 
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="aspect-square overflow-hidden">
                          <img 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                            src={doctor.image || '/api/placeholder/300/300'} 
                            alt={doctor.name}
                            onError={(e) => {
                              e.target.src = '/api/placeholder/300/300';
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-500 text-sm" />
                              <span className="text-xs text-gray-600">
                                {doctor.rating ? doctor.rating.toFixed(1) : 'New'}
                              </span>
                            </div>
                          </div>
                          
                          <h4 className="font-semibold text-gray-900 mb-1">{doctor.name}</h4>
                          <p className="text-sm text-green-600 font-medium mb-2">{doctor.speciality}</p>
                          <p className="text-xs text-gray-500 mb-4">
                            {doctor.experience ? `${doctor.experience} years experience` : 'Experienced'}
                          </p>
                          
                          <button 
                            onClick={() => navigate(`/appointment/${doctor._id}`)}
                            className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                          >
                            Book Appointment
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaUserMd className="text-gray-300 text-4xl mx-auto mb-4" />
                    <p className="text-gray-500">No doctors available at this hospital.</p>
                  </div>
                )}
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Medical Services</h3>
                {hospital.specializations && hospital.specializations.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {hospital.specializations.map((service, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <FaHeart className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{service}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Service information not available.</p>
                )}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-green-500 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Address</h4>
                        <p className="text-gray-600">{hospital.address}, {hospital.district}</p>
                      </div>
                    </div>
                    
                    {hospital.phone && (
                      <div className="flex items-start gap-3">
                        <FaPhone className="text-green-500 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
                          <p className="text-gray-600">{hospital.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <FaClock className="text-green-500 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Operating Hours</h4>
                        <p className="text-gray-600">
                          {hospital.workingHours || '24/7 (Emergency Services Available)'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Need Help?</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Contact us for appointments, emergency services, or general inquiries.
                    </p>
                    <button className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium">
                      Call Hospital
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;