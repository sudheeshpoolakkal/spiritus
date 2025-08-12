import React, { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaSpinner,
  FaMapMarkerAlt,
  FaBuilding,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaUserTie,
  FaUsers,
  FaBrain,
  FaHospitalUser,
  FaCalendarCheck,
  FaAmbulance,
  FaUsersCog,
  FaCertificate,
  FaClock,
  FaDollarSign,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaCamera
} from "react-icons/fa";

const HospitalProfile = () => {
  const { backendUrl, hToken } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [localProfileData, setLocalProfileData] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  // Fetch profile data
  const getProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/hospital/profile`, {
        headers: { Authorization: `Bearer ${hToken}` }
      });
      if (data.success) {
        setProfileData(data.hospital);
        setLocalProfileData(data.hospital);
      } else {
        setProfileData(false);
        toast.error(data.message);
      }
    } catch (error) {
      setProfileData(false);
      toast.error(error.message || "Failed to fetch profile data");
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('hToken');
        toast.error('Session expired. Please login again.');
      }
    }
  }, [backendUrl, hToken]);

  useEffect(() => {
    if (hToken) {
      getProfileData();
    }
  }, [hToken, getProfileData]);

  // Update profile
  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const updateData = {
        address: localProfileData.address,
        operatingHours: localProfileData.operatingHours,
        contactNumber: localProfileData.contactNumber,
        website: localProfileData.website,
        keyContact: localProfileData.keyContact,
        mentalHealthProfessionals: localProfileData.mentalHealthProfessionals,
        specializations: localProfileData.specializations,
        averagePatientLoad: localProfileData.averagePatientLoad,
        insuranceTies: localProfileData.insuranceTies,
        accreditations: localProfileData.accreditations,
      };

      const { data } = await axios.put(`${backendUrl}/api/hospital/profile`, updateData, {
        headers: { Authorization: `Bearer ${hToken}` }
      });
      
      if (data.success) {
        toast.success("Profile updated successfully!");
        setProfileData(data.hospital);
        setLocalProfileData(data.hospital);
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setLocalProfileData(profileData);
  };

  // Helper to safely build image src
  const getLogoSrc = () => {
    const logo = localProfileData?.hospitalLogo;
    if (!logo) return '/images/default-logo.png';

    if (typeof logo === 'string') {
      if (logo.startsWith('http') || logo.startsWith('data:')) return logo;
      const pathPart = logo.startsWith('/') ? logo : `/${logo}`;
      return `${backendUrl}${pathPart}`;
    }

    try {
      const contentType = logo.contentType || logo.mimetype || 'image/jpeg';
      let byteArray = null;

      if (logo.data) {
        byteArray = logo.data.data ? logo.data.data : logo.data;
      } else if (Array.isArray(logo)) {
        byteArray = logo;
      }

      if (byteArray) {
        const u8 = byteArray instanceof Uint8Array ? byteArray : new Uint8Array(byteArray);
        const binary = Array.from(u8).map(byte => String.fromCharCode(byte)).join('');
        const base64 = btoa(binary);
        return `data:${contentType};base64,${base64}`;
      }
    } catch (err) {
      console.warn('Failed to convert logo buffer to base64', err);
    }

    return '/images/default-logo.png';
  };

  // Loading state
  if (profileData === null) {
    return (
      <div className="p-6 text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
        </div>
        <p className="mt-2 text-gray-500">Loading hospital data...</p>
      </div>
    );
  }

  if (profileData === false) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-medium">Error loading hospital data. Please try again or login again.</p>
        <button 
          onClick={getProfileData} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const logoSrc = getLogoSrc();
  const safeSpecializations = Array.isArray(localProfileData.specializations)
    ? localProfileData.specializations.join(', ')
    : (localProfileData.specializations || '');

  const licenseHref = (() => {
    const lic = localProfileData?.hospitalLicense;
    if (!lic) return '#';
    if (typeof lic === 'string') {
      return (lic.startsWith('http') || lic.startsWith('data:')) ? lic : `${backendUrl}${lic.startsWith('/') ? '' : '/'}${lic}`;
    }
    return '#';
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hospital Profile</h1>
              <p className="text-gray-600 mt-1">Manage your hospital information and settings</p>
            </div>
            <div className="flex space-x-3">
              {isEdit ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-sm"
                  >
                    <FaTimes className="text-sm" />
                    Cancel
                  </button>
                  <button
                    onClick={updateProfile}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <FaSpinner className="animate-spin text-sm" />
                    ) : (
                      <FaSave className="text-sm" />
                    )}
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <FaEdit className="text-sm" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 px-8 py-12 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-white p-2 shadow-2xl">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src={logoSrc}
                    alt={`${localProfileData.hospitalName || 'Hospital'} Logo`}
                    onLoad={() => setImageLoading(false)}
                    onError={(e) => { 
                      e.currentTarget.onerror = null; 
                      e.currentTarget.src = '/images/default-logo.png';
                      setImageLoading(false);
                    }}
                  />
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
                      <FaSpinner className="animate-spin text-gray-400 text-2xl" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <FaCamera className="text-gray-400 text-sm" />
                </div>
              </div>
              
              <div className="text-center md:text-left text-white">
                <h2 className="text-4xl font-bold mb-2 flex items-center justify-center md:justify-start gap-3">
                  <FaBuilding className="text-white/90" />
                  {localProfileData.hospitalName || 'Unnamed Hospital'}
                </h2>
                <div className="flex flex-col md:flex-row gap-4 text-white/90">
                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                    {localProfileData.type ? `${localProfileData.type} Facility` : 'Healthcare Facility'}
                  </span>
                  {localProfileData.yearEstablished && (
                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                      Established {localProfileData.yearEstablished}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact & Location */}
          <div className="space-y-6">
            <ProfileCard
              title="Contact Information"
              icon={<FaPhoneAlt className="text-green-500" />}
              className="bg-gradient-to-br from-green-50 to-blue-50"
            >
              <div className="space-y-4">
                <ContactField
                  icon={<FaMapMarkerAlt className="text-red-500" />}
                  label="Address"
                  value={`${localProfileData.address || ''}${localProfileData.district ? ', ' + localProfileData.district : ''}${localProfileData.state ? ', ' + localProfileData.state : ''}${localProfileData.country ? ', ' + localProfileData.country : ''}${localProfileData.pinCode ? ' - ' + localProfileData.pinCode : ''}` || 'N/A'}
                  isEdit={isEdit}
                  onChange={(value) => setLocalProfileData(prev => ({ ...prev, address: value }))}
                  multiline
                />
                <ContactField
                  icon={<FaPhoneAlt className="text-green-500" />}
                  label="Phone"
                  value={localProfileData.contactNumber || 'N/A'}
                  isEdit={isEdit}
                  onChange={(value) => setLocalProfileData(prev => ({ ...prev, contactNumber: value }))}
                  type="tel"
                />
                <ContactField
                  icon={<FaEnvelope className="text-blue-500" />}
                  label="Email"
                  value={localProfileData.emailAddress || 'N/A'}
                  isEdit={false}
                />
                <ContactField
                  icon={<FaGlobe className="text-purple-500" />}
                  label="Website"
                  value={localProfileData.website || 'Not provided'}
                  isEdit={isEdit}
                  onChange={(value) => setLocalProfileData(prev => ({ ...prev, website: value }))}
                  type="url"
                  isLink={!isEdit}
                />
              </div>
            </ProfileCard>

            <ProfileCard
              title="Operating Hours"
              icon={<FaClock className="text-blue-500" />}
              className="bg-gradient-to-br from-blue-50 to-indigo-50"
            >
              {isEdit ? (
                <textarea
                  className="w-full p-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all h-24 resize-none"
                  value={localProfileData.operatingHours || ''}
                  onChange={(e) => setLocalProfileData(prev => ({ ...prev, operatingHours: e.target.value }))}
                  placeholder="e.g., Monday - Friday: 9:00 AM - 6:00 PM"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {localProfileData.operatingHours || 'Not specified'}
                </p>
              )}
            </ProfileCard>
          </div>

          {/* Middle Column - Services & Staff */}
          <div className="space-y-6">
            <ProfileCard
              title="Staff & Capacity"
              icon={<FaUsers className="text-indigo-500" />}
              className="bg-gradient-to-br from-indigo-50 to-purple-50"
            >
              <div className="space-y-4">
                <StaffField
                  icon={<FaUserTie className="text-gray-600" />}
                  label="Key Contact"
                  value={localProfileData.keyContact || 'N/A'}
                  isEdit={isEdit}
                  onChange={(value) => setLocalProfileData(prev => ({ ...prev, keyContact: value }))}
                />
                <StaffField
                  icon={<FaUsersCog className="text-blue-600" />}
                  label="Mental Health Professionals"
                  value={localProfileData.mentalHealthProfessionals || '0'}
                  isEdit={isEdit}
                  onChange={(value) => setLocalProfileData(prev => ({ ...prev, mentalHealthProfessionals: value }))}
                  type="number"
                />
                <StaffField
                  icon={<FaHospitalUser className="text-green-600" />}
                  label="Average Daily Patients"
                  value={localProfileData.averagePatientLoad || 'N/A'}
                  isEdit={isEdit}
                  onChange={(value) => setLocalProfileData(prev => ({ ...prev, averagePatientLoad: value }))}
                  type="number"
                />
              </div>
            </ProfileCard>

            <ProfileCard
              title="Services Available"
              icon={<FaAmbulance className="text-red-500" />}
              className="bg-gradient-to-br from-red-50 to-orange-50"
            >
              <div className="space-y-4">
                <ServiceStatus
                  label="Teletherapy"
                  available={localProfileData.teletherapy === 'yes'}
                  icon={<FaCalendarCheck />}
                />
                <ServiceStatus
                  label="Emergency Support"
                  available={localProfileData.emergencySupport === 'yes'}
                  icon={<FaAmbulance />}
                />
                <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Partnerships</label>
                  {isEdit ? (
                    <input
                      type="text"
                      className="w-full p-3 border-2 border-red-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      value={localProfileData.insuranceTies || ''}
                      onChange={(e) => setLocalProfileData(prev => ({ ...prev, insuranceTies: e.target.value }))}
                      placeholder="Enter insurance partnerships"
                    />
                  ) : (
                    <p className="text-gray-700">{localProfileData.insuranceTies || 'None specified'}</p>
                  )}
                </div>
              </div>
            </ProfileCard>
          </div>

          {/* Right Column - Specializations & Credentials */}
          <div className="space-y-6">
            <ProfileCard
              title="Specializations"
              icon={<FaBrain className="text-orange-500" />}
              className="bg-gradient-to-br from-orange-50 to-yellow-50"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical Specialties</label>
                  {isEdit ? (
                    <textarea
                      className="w-full p-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all h-24 resize-none"
                      value={safeSpecializations}
                      onChange={(e) => setLocalProfileData(prev => ({ ...prev, specializations: e.target.value.split(',').map(s => s.trim()) }))}
                      placeholder="e.g., Cardiology, Neurology, Pediatrics"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {safeSpecializations ? (
                        safeSpecializations.split(',').map((spec, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                            {spec.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 italic">No specializations listed</span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaDollarSign className="text-green-500" />
                    Current Fees
                  </label>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-xl">
                    {localProfileData.currentFees || 'Contact for pricing information'}
                  </p>
                </div>
              </div>
            </ProfileCard>

            <ProfileCard
              title="Accreditations & License"
              icon={<FaCertificate className="text-yellow-500" />}
              className="bg-gradient-to-br from-yellow-50 to-green-50"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                  {isEdit ? (
                    <textarea
                      className="w-full p-3 border-2 border-yellow-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all h-32 resize-none"
                      value={localProfileData.accreditations || ''}
                      onChange={(e) => setLocalProfileData(prev => ({ ...prev, accreditations: e.target.value }))}
                      placeholder="Enter accreditations and certifications"
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {localProfileData.accreditations || 'No accreditations listed'}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Document</label>
                  <a
                    href={licenseHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-xl transition-all font-medium"
                  >
                    <FaEye className="text-sm" />
                    View License
                  </a>
                </div>
              </div>
            </ProfileCard>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const ProfileCard = ({ title, icon, children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}>
    <div className="p-6 border-b border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
        {icon}
        {title}
      </h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const ContactField = ({ icon, label, value, isEdit, onChange, type = "text", multiline = false, isLink = false }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1">{icon}</div>
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {isEdit ? (
        multiline ? (
          <textarea
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all h-20 resize-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            type={type}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )
      ) : (
        isLink && value !== 'Not provided' ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
            {value}
          </a>
        ) : (
          <p className="text-gray-700">{value}</p>
        )
      )}
    </div>
  </div>
);

const StaffField = ({ icon, label, value, isEdit, onChange, type = "text" }) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium text-gray-700">{label}</span>
    </div>
    <div>
      {isEdit ? (
        <input
          type={type}
          className="w-20 p-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 outline-none text-center"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <span className="font-semibold text-gray-800">{value}</span>
      )}
    </div>
  </div>
);

const ServiceStatus = ({ label, available, icon }) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
    <div className="flex items-center gap-3">
      <span className={available ? "text-green-500" : "text-gray-400"}>{icon}</span>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {available ? (
        <>
          <FaCheckCircle className="text-green-500" />
          <span className="text-green-600 font-medium">Available</span>
        </>
      ) : (
        <>
          <FaTimesCircle className="text-gray-400" />
          <span className="text-gray-500">Not Available</span>
        </>
      )}
    </div>
  </div>
);

export default HospitalProfile;