import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { DoctorContext } from "../../context/DoctorContext";
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
  FaUserMd 
} from "react-icons/fa";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localProfileData, setLocalProfileData] = useState(null);

  // Sync local data with profile data
  useEffect(() => {
    if (profileData) {
      setLocalProfileData({ ...profileData });
    }
  }, [profileData]);

  // Update profile method
  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const updateData = {
        address: localProfileData.address,
        fees: localProfileData.fees,
        available: localProfileData.available,
      };
      const { data } = await axios.post(backendUrl + "/api/doctor/update-profile", updateData, {
        headers: { dToken },
      });
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setIsEdit(false);
    setLocalProfileData(profileData);
  };

  // Fetch profile data on mount or token change
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken, getProfileData]);

  if (!localProfileData) return null;

  return (
    <div className="w-full pl-4 md:pl-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 max-w-4xl">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8 pb-6 border-b">
          <div className="relative">
            <img
              className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-blue-100"
              src={localProfileData.image}
              alt={`Dr. ${localProfileData.name}`}
            />
            {isEdit && (
              <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full">
                <FaEdit />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaUserMd className="text-blue-600" />
              {localProfileData.name}
            </h1>
            <p className="text-md text-gray-600 mt-1">
              {localProfileData.degree} - {localProfileData.speciality}
            </p>
            <p className="text-sm text-gray-500">
              {localProfileData.experience} years of experience
            </p>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="material-icons text-blue-600">info</span>
              About
            </h2>
            {isEdit ? (
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 h-32"
                value={localProfileData.about}
                onChange={(e) => setLocalProfileData(prev => ({ ...prev, about: e.target.value }))}
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {localProfileData.about}
              </p>
            )}
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            {/* Fees Section */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaMoneyBillWave className="text-green-600" />
                Appointment Fee
              </h3>
              {isEdit ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{currency}</span>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                    value={localProfileData.fees}
                    onChange={(e) => setLocalProfileData(prev => ({ ...prev, fees: e.target.value }))}
                  />
                </div>
              ) : (
                <p className="text-gray-600">{currency}{localProfileData.fees}</p>
              )}
            </div>

            {/* Location Section */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-600" />
                Location
              </h3>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                    value={localProfileData.address.line1}
                    onChange={(e) => setLocalProfileData(prev => ({
                      ...prev, 
                      address: { ...prev.address, line1: e.target.value }
                    }))}
                  />
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200"
                    value={localProfileData.address.line2}
                    onChange={(e) => setLocalProfileData(prev => ({
                      ...prev, 
                      address: { ...prev.address, line2: e.target.value }
                    }))}
                  />
                </div>
              ) : (
                <p className="text-gray-600">
                  {localProfileData.address.line1} <br />
                  {localProfileData.address.line2}
                </p>
              )}
            </div>

            {/* Availability Section */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaClock className="text-purple-600" />
                Availability
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  checked={localProfileData.available}
                  onChange={() => isEdit && setLocalProfileData(prev => ({ ...prev, available: !prev.available }))}
                  disabled={!isEdit}
                />
                <label 
                  htmlFor="available" 
                  className={`text-sm ${localProfileData.available ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {localProfileData.available ? 'Currently Available' : 'Not Available'}
                </label>
              </div>
            </div>
          </div>
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

export default DoctorProfile;