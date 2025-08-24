import React, { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import { HospitalContext } from "../context/HospitalContext";
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
  FaCheckCircle,
  FaTimesCircle,
  FaEye
} from "react-icons/fa";

const HospitalProfile = () => {
  const { backendUrl, hToken } = useContext(HospitalContext);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-3xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading hospital data...</p>
        </div>
      </div>
    );
  }

  if (profileData === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">Error loading hospital data. Please try again or login again.</p>
          <button 
            onClick={getProfileData} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Hospital Profile</h1>
              <p className="text-gray-600 mt-1">Manage your hospital information</p>
            </div>
            <div className="flex space-x-3">
              {isEdit ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <FaTimes className="text-sm" />
                    Cancel
                  </button>
                  <button
                    onClick={updateProfile}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? <FaSpinner className="animate-spin text-sm" /> : <FaSave className="text-sm" />}
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <FaEdit className="text-sm" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hospital Header */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex-shrink-0">
              <img
                className="w-full h-full object-cover"
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
                <div className="w-full h-full flex items-center justify-center">
                  <FaSpinner className="animate-spin text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FaBuilding className="text-gray-500" />
                {localProfileData.hospitalName || 'Unnamed Hospital'}
              </h2>
              <div className="flex gap-4 text-sm text-gray-600">
                {localProfileData.type && (
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {localProfileData.type} Facility
                  </span>
                )}
                {localProfileData.yearEstablished && (
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    Est. {localProfileData.yearEstablished}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Improved Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Information - Full height */}
          <div className="bg-white border rounded-lg">
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <FaPhoneAlt className="text-gray-500" />
                Contact Information
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <InfoField
                icon={<FaMapMarkerAlt className="text-gray-400" />}
                label="Address"
                value={`${localProfileData.address || ''}${localProfileData.district ? ', ' + localProfileData.district : ''}${localProfileData.state ? ', ' + localProfileData.state : ''}${localProfileData.country ? ', ' + localProfileData.country : ''}${localProfileData.pinCode ? ' - ' + localProfileData.pinCode : ''}` || 'N/A'}
                isEdit={isEdit}
                onChange={(value) => setLocalProfileData(prev => ({ ...prev, address: value }))}
                multiline
              />
              <InfoField
                icon={<FaPhoneAlt className="text-gray-400" />}
                label="Phone"
                value={localProfileData.contactNumber || 'N/A'}
                isEdit={isEdit}
                onChange={(value) => setLocalProfileData(prev => ({ ...prev, contactNumber: value }))}
                type="tel"
              />
              <InfoField
                icon={<FaEnvelope className="text-gray-400" />}
                label="Email"
                value={localProfileData.emailAddress || 'N/A'}
                isEdit={false}
              />
              <InfoField
                icon={<FaGlobe className="text-gray-400" />}
                label="Website"
                value={localProfileData.website || 'Not provided'}
                isEdit={isEdit}
                onChange={(value) => setLocalProfileData(prev => ({ ...prev, website: value }))}
                type="url"
                isLink={!isEdit}
              />
            </div>
          </div>

          {/* Operating Hours & Services - Combined for better height */}
          <div className="bg-white border rounded-lg">
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <FaClock className="text-gray-500" />
                Operating Hours & Services
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Operating Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                {isEdit ? (
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="2"
                    value={localProfileData.operatingHours || ''}
                    onChange={(e) => setLocalProfileData(prev => ({ ...prev, operatingHours: e.target.value }))}
                    placeholder="e.g., Mon-Fri: 9AM-6PM, Sat: 9AM-2PM"
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-3 rounded border">
                    {localProfileData.operatingHours || 'Not specified'}
                  </p>
                )}
              </div>

              {/* Services */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Available Services</label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Partnerships</label>
                  {isEdit ? (
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={localProfileData.insuranceTies || ''}
                      onChange={(e) => setLocalProfileData(prev => ({ ...prev, insuranceTies: e.target.value }))}
                      placeholder="Enter insurance partnerships"
                    />
                  ) : (
                    <p className="text-gray-700 bg-gray-50 p-2 rounded border text-sm">
                      {localProfileData.insuranceTies || 'None specified'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Staff Information - Expanded */}
          <div className="bg-white border rounded-lg">
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <FaUsers className="text-gray-500" />
                Staff Information
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <StaffField
                icon={<FaUserTie className="text-gray-400" />}
                label="Key Contact"
                value={localProfileData.keyContact || 'N/A'}
                isEdit={isEdit}
                onChange={(value) => setLocalProfileData(prev => ({ ...prev, keyContact: value }))}
              />
              <StaffField
                icon={<FaUsersCog className="text-gray-400" />}
                label="Mental Health Professionals"
                value={localProfileData.mentalHealthProfessionals || '0'}
                isEdit={isEdit}
                onChange={(value) => setLocalProfileData(prev => ({ ...prev, mentalHealthProfessionals: value }))}
                type="number"
              />
              <StaffField
                icon={<FaHospitalUser className="text-gray-400" />}
                label="Average Daily Patients"
                value={localProfileData.averagePatientLoad || 'N/A'}
                isEdit={isEdit}
                onChange={(value) => setLocalProfileData(prev => ({ ...prev, averagePatientLoad: value }))}
                type="number"
              />
              
              {/* Current Fees moved here for better balance */}
              <div className="pt-2 border-t">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FaDollarSign className="text-gray-400" />
                  Current Fees
                </label>
                <p className="text-gray-700 bg-gray-50 p-3 rounded border text-sm">
                  {localProfileData.currentFees || 'Contact for pricing information'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Specializations */}
          <div className="bg-white border rounded-lg">
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <FaBrain className="text-gray-500" />
                Specializations
              </h3>
            </div>
            <div className="p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical Specialties</label>
                {isEdit ? (
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="5"
                    value={safeSpecializations}
                    onChange={(e) => setLocalProfileData(prev => ({ ...prev, specializations: e.target.value.split(',').map(s => s.trim()) }))}
                    placeholder="e.g., Cardiology, Neurology, Pediatrics"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {safeSpecializations ? (
                      safeSpecializations.split(',').map((spec, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm border border-blue-200">
                          {spec.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 italic">No specializations listed</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Accreditations */}
          <div className="bg-white border rounded-lg">
            <div className="border-b px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <FaCertificate className="text-gray-500" />
                Accreditations & License
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                {isEdit ? (
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    value={localProfileData.accreditations || ''}
                    onChange={(e) => setLocalProfileData(prev => ({ ...prev, accreditations: e.target.value }))}
                    placeholder="Enter accreditations and certifications"
                  />
                ) : (
                  <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded border">
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
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition-colors"
                >
                  <FaEye className="text-sm" />
                  View License
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const InfoField = ({ icon, label, value, isEdit, onChange, type = "text", multiline = false, isLink = false }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
      {icon}
      {label}
    </label>
    {isEdit ? (
      multiline ? (
        <textarea
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
);

const StaffField = ({ icon, label, value, isEdit, onChange, type = "text" }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <div>
      {isEdit ? (
        <input
          type={type}
          className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <span className="font-medium text-gray-900">{value}</span>
      )}
    </div>
  </div>
);

const ServiceStatus = ({ label, available, icon }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className={available ? "text-green-500" : "text-gray-400"}>{icon}</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {available ? (
        <>
          <FaCheckCircle className="text-green-500 text-sm" />
          <span className="text-green-600 text-sm font-medium">Available</span>
        </>
      ) : (
        <>
          <FaTimesCircle className="text-gray-400 text-sm" />
          <span className="text-gray-500 text-sm">Not Available</span>
        </>
      )}
    </div>
  </div>
);

export default HospitalProfile;