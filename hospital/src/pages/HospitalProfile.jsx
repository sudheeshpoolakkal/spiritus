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
  FaMoneyBillWave, 
  FaClock,
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
  FaCertificate
} from "react-icons/fa";

const HospitalProfile = () => {
  const { backendUrl, hToken } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [localProfileData, setLocalProfileData] = useState(null);

  const getProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/hospital/profile`, { headers: { hToken } });
      if (data.success) {
        setProfileData(data.hospital);
        setLocalProfileData(data.hospital);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch profile data");
    }
  }, [backendUrl, hToken]);

  useEffect(() => {
    if (hToken) {
      getProfileData();
    }
  }, [hToken, getProfileData]);

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const updateData = {
        address: localProfileData.address,
        currentFees: localProfileData.currentFees,
        operatingHours: localProfileData.operatingHours,
        contactNumber: localProfileData.contactNumber,
        website: localProfileData.website,
        keyContact: localProfileData.keyContact,
        mentalHealthProfessionals: localProfileData.mentalHealthProfessionals,
        specializations: localProfileData.specializations,
        teletherapy: localProfileData.teletherapy,
        emergencySupport: localProfileData.emergencySupport,
        averagePatientLoad: localProfileData.averagePatientLoad,
        insuranceTies: localProfileData.insuranceTies,
        accreditations: localProfileData.accreditations,
      };

      const { data } = await axios.put(`${backendUrl}/api/hospital/profile`, updateData, { headers: { hToken } });
      if (data.success) {
        toast.success(data.message);
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

  if (!localProfileData) return <div className="flex justify-center items-center h-screen"><FaSpinner className="animate-spin text-4xl text-blue-600" /></div>;

  return (
    <div className="w-full pl-4 md:pl-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8 pb-6 border-b">
          <div className="relative">
            <img
              className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-blue-100"
              src={localProfileData.hospitalLogo}
              alt={`${localProfileData.hospitalName} Logo`}
            />
            {isEdit && (
              <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full">
                <FaEdit />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaBuilding className="text-blue-600" />
              {localProfileData.hospitalName}
            </h1>
            <p className="text-md text-gray-600 mt-1 capitalize">
              {localProfileData.type} Facility
            </p>
            <p className="text-sm text-gray-500">
              Established in {localProfileData.yearEstablished}
            </p>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Accreditations Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaCertificate className="text-blue-600" />
              Accreditations & Certifications
            </h2>
            {isEdit ? (
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 h-32"
                value={localProfileData.accreditations}
                onChange={(e) => setLocalProfileData(prev => ({ ...prev, accreditations: e.target.value }))}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {localProfileData.accreditations}
              </p>
            )}
          </div>

          {/* Contact & Location Details */}
          <div className="space-y-4">
            {/* Location Section */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-600" />
                Location
              </h3>
              {isEdit ? (
                <textarea
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                  value={localProfileData.address}
                  onChange={(e) => setLocalProfileData(prev => ({ ...prev, address: e.target.value }))}
                />
              ) : (
                <p className="text-gray-600">
                  {localProfileData.address}, {localProfileData.district}, {localProfileData.state}, {localProfileData.country} - {localProfileData.pinCode}
                </p>
              )}
            </div>

            {/* Contact Number */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaPhoneAlt className="text-green-600" />
                Contact Number
              </h3>
              {isEdit ? (
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                  value={localProfileData.contactNumber}
                  onChange={(e) => setLocalProfileData(prev => ({ ...prev, contactNumber: e.target.value }))}
                />
              ) : (
                <p className="text-gray-600">{localProfileData.contactNumber}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaEnvelope className="text-blue-600" />
                Email Address
              </h3>
              <p className="text-gray-600">{localProfileData.emailAddress}</p>
            </div>

            {/* Website */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaGlobe className="text-purple-600" />
                Website
              </h3>
              {isEdit ? (
                <input
                  type="url"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                  value={localProfileData.website}
                  onChange={(e) => setLocalProfileData(prev => ({ ...prev, website: e.target.value }))}
                />
              ) : (
                <a href={localProfileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {localProfileData.website || 'Not provided'}
                </a>
              )}
            </div>
          </div>

          {/* Staff & Services */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaUsers className="text-indigo-600" />
              Staff & Services
            </h2>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaUserTie className="text-gray-600" />
                <strong>Key Contact:</strong> 
                {isEdit ? (
                  <input
                    type="text"
                    className="ml-2 p-1 border border-gray-300 rounded"
                    value={localProfileData.keyContact}
                    onChange={(e) => setLocalProfileData(prev => ({ ...prev, keyContact: e.target.value }))}
                  />
                ) : (
                  <span className="ml-2">{localProfileData.keyContact}</span>
                )}
              </p>
              <p className="flex items-center gap-2">
                <FaUsersCog className="text-gray-600" />
                <strong>Mental Health Professionals:</strong> 
                {isEdit ? (
                  <input
                    type="number"
                    className="ml-2 p-1 border border-gray-300 rounded w-20"
                    value={localProfileData.mentalHealthProfessionals}
                    onChange={(e) => setLocalProfileData(prev => ({ ...prev, mentalHealthProfessionals: e.target.value }))}
                  />
                ) : (
                  <span className="ml-2">{localProfileData.mentalHealthProfessionals}</span>
                )}
              </p>
              <p className="flex items-center gap-2">
                <FaHospitalUser className="text-gray-600" />
                <strong>Average Daily Patients:</strong> 
                {isEdit ? (
                  <input
                    type="number"
                    className="ml-2 p-1 border border-gray-300 rounded w-20"
                    value={localProfileData.averagePatientLoad}
                    onChange={(e) => setLocalProfileData(prev => ({ ...prev, averagePatientLoad: e.target.value }))}
                  />
                ) : (
                  <span className="ml-2">{localProfileData.averagePatientLoad}</span>
                )}
              </p>
            </div>
          </div>

          {/* Specializations & Fees */}
          <div className="space-y-4">
            {/* Specializations */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaBrain className="text-orange-600" />
                Specializations
              </h3>
              {isEdit ? (
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                  value={localProfileData.specializations.join(', ')}
                  onChange={(e) => setLocalProfileData(prev => ({ ...prev, specializations: e.target.value.split(', ').map(s => s.trim()) }))}
                />
              ) : (
                <p className="text-gray-600">{localProfileData.specializations.join(', ')}</p>
              )}
            </div>

            {/* Fees Section */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaMoneyBillWave className="text-green-600" />
                Current Fees
              </h3>
              {isEdit ? (
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                  value={localProfileData.currentFees}
                  onChange={(e) => setLocalProfileData(prev => ({ ...prev, currentFees: e.target.value }))}
                />
              ) : (
                <p className="text-gray-600">{localProfileData.currentFees}</p>
              )}
            </div>

            {/* Operating Hours */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaClock className="text-purple-600" />
                Operating Hours
              </h3>
              {isEdit ? (
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                  value={localProfileData.operatingHours}
                  onChange={(e) => setLocalProfileData(prev => ({ ...prev, operatingHours: e.target.value }))}
                />
              ) : (
                <p className="text-gray-600">{localProfileData.operatingHours}</p>
              )}
            </div>
          </div>

          {/* Additional Services */}
          <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaCalendarCheck className="text-blue-600" />
                Teletherapy
              </h3>
              {isEdit ? (
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                  value={localProfileData.teletherapy}
                  onChange={(e) => setLocalProfileData(prev => ({ ...prev, teletherapy: e.target.value }))}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              ) : (
                <p className={`text-sm ${localProfileData.teletherapy === 'yes' ? 'text-green-600' : 'text-gray-500'}`}>
                  {localProfileData.teletherapy === 'yes' ? 'Available' : 'Not Available'}
                </p>
              )}
            </div>

            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaAmbulance className="text-red-600" />
                Emergency Support
              </h3>
              {isEdit ? (
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                  value={localProfileData.emergencySupport}
                  onChange={(e) => setLocalProfileData(prev => ({ ...prev, emergencySupport: e.target.value }))}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              ) : (
                <p className={`text-sm ${localProfileData.emergencySupport === 'yes' ? 'text-green-600' : 'text-gray-500'}`}>
                  {localProfileData.emergencySupport === 'yes' ? 'Available' : 'Not Available'}
                </p>
              )}
            </div>

            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaUsers className="text-indigo-600" />
                Insurance Ties
              </h3>
              {isEdit ? (
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                  value={localProfileData.insuranceTies}
                  onChange={(e) => setLocalProfileData(prev => ({ ...prev, insuranceTies: e.target.value }))}
                />
              ) : (
                <p className="text-gray-600">{localProfileData.insuranceTies || 'None'}</p>
              )}
            </div>
          </div>
        </div>

        {/* License Document */}
        <div className="mt-8">
          <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FaCertificate className="text-yellow-600" />
            Hospital License
          </h3>
          <a href={localProfileData.hospitalLicense} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            View License Document
          </a>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          {isEdit ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-sm rounded text-gray-700 flex items-center gap-2 hover:bg-gray-100 transition"
              >
                <FaTimes /> Cancel
              </button>
              <button
                onClick={updateProfile}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded flex items-center gap-2 hover:bg-blue-700 transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 border border-blue-600 text-blue-600 text-sm rounded flex items-center gap-2 hover:bg-blue-50 transition"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;