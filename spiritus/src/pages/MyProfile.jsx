import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets_frontend/assets";
import { AppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import bg3 from "@/assets/assets_frontend/aurora.webp"; // Background Image

const MyProfile = () => {
  const navigate = useNavigate();
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        {/* Circular "X" button at the top-right corner to navigate back */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-12 bg-gray-600 text-white w-10 h-10 rounded-full 
                     flex items-center justify-center hover:bg-gray-500 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="bg-[#242425] text-zinc-200 p-8 rounded-3xl shadow-lg w-full max-w-xl">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            {isEdit ? (
              <label htmlFor="image" className="cursor-pointer relative">
                <img
                  className="w-28 h-28 rounded-full opacity-75 border-4 border-gray-400"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
                <img
                  className="w-8 absolute bottom-2 right-2"
                  src={image ? "" : assets.upload_icon}
                  alt="Upload Icon"
                />
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            ) : (
              <img
                className="w-28 h-28 rounded-full border-4 border-gray-400"
                src={userData.image}
                alt="Profile"
              />
            )}

            {isEdit ? (
              <input
                className="bg-gray-700 text-lg font-medium text-center mt-4 w-full p-2 rounded-lg border border-gray-500"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <p className="font-medium text-xl mt-4">{userData.name}</p>
            )}
          </div>

          <hr className="border-gray-500 my-4" />

          <div className="grid grid-cols-2 gap-6">
            {/* Contact Information */}
            <div>
              <p className="text-gray-400 underline">CONTACT INFO</p>
              <p className="text-gray-400 mt-2">Email:</p>
              <p className="text-primary">{userData.email}</p>
              <p className="text-gray-400 mt-2">Phone:</p>
              {isEdit ? (
                <input
                  className="w-full bg-gray-700 p-2 rounded-lg border border-gray-500"
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-blue-400">{userData.phone}</p>
              )}
            </div>

            {/* Basic Information */}
            <div>
              <p className="text-gray-400 underline">BASIC INFO</p>
              <div className="flex items-center mt-2">
                <p className="text-gray-400">Gender: </p>
                {isEdit ? (
                  <select
                    className="ml-2 bg-gray-700 p-2 rounded-lg border border-gray-500"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    value={userData.gender}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <p className="ml-2 text-gray-400">{userData.gender}</p>
                )}
              </div>

              <div className="flex items-center mt-2">
                <p className="text-gray-400">Birthday: </p>
                {isEdit ? (
                  <input
                    className="ml-2 bg-gray-700 p-2 rounded-lg border border-gray-500"
                    type="date"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, dob: e.target.value }))
                    }
                  />
                ) : (
                  <p className="ml-2">{userData.dob}</p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-gray-500 my-4" />

          {/* Address */}
          <div>
            <p className="text-gray-400 underline">ADDRESS</p>
            {isEdit ? (
              <div className="mt-3">
                <input
                  className="w-full bg-gray-700 p-2 rounded-lg border border-gray-500 mb-2"
                  type="text"
                  placeholder="Address Line 1"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  className="w-full bg-gray-700 p-2 rounded-lg border border-gray-500"
                  type="text"
                  placeholder="Address Line 2"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p className="text-gray-400 mt-3">
                {userData.address.line1}, {userData.address.line2}
              </p>
            )}
          </div>

          <div className="mt-6 text-center">
            {isEdit ? (
              <button
                className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-all"
                onClick={updateUserProfileData}
              >
                Save
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-all"
                onClick={() => setIsEdit(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
