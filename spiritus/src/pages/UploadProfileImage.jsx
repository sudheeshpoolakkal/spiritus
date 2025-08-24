import React, { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "@/assets/assets_frontend/assets";
import bg3 from "@/assets/assets_frontend/aurora.webp";

import profilePlaceholder from "@/assets/assets_admin/upload_area.svg";
const UploadProfileImage = () => {
  const { backendUrl, token, loadUserProfileData, userData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [profileFile, setProfileFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfileFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadUserImage = async () => {
    if (!profileFile) {
      toast.error("Please select an image");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", profileFile);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/upload-profile-image`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Account created successfully!");
        await loadUserProfileData();
        navigate("/complete-profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg3})` }}
    >
      <div className="bg-[#242425] p-8 rounded-3xl shadow-lg w-full max-w-md text-zinc-200">
        <h2 className="text-2xl font-bold text-center mb-8">
          Upload Profile Image
        </h2>
        <div className="flex flex-col items-center">
          <label
            htmlFor="profile-img"
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <div className="relative">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  className="w-full h-full object-cover"
                  src={
                    previewUrl ||
                    (userData.image ? userData.image : profilePlaceholder)
                  }
                  alt="Profile Preview"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium">Change</span>
                </div>
              </div>
            </div>
            <input
              type="file"
              id="profile-img"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </label>
          <button
            onClick={uploadUserImage}
            disabled={isUploading}
            className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold transition-colors shadow ${
              isUploading
                ? "bg-indigo-300 text-white cursor-wait"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isUploading ? "Uploading..." : "Save Profile Image"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProfileImage;
