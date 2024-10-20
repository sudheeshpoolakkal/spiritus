import React, { useState } from "react";
import { assets } from "@/assets/assets_frontend/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Arun AR",
    image: assets.profile_pic,
    email: "arundas@gmail.com",
    phone: "+918597553689",
    address: {
      line1: "cherppulassery",
      line2: "(po)ottapalam,palakkad",
    },
    gender: "male",
    dob: "2004-05-23",
  });

  const [isEdit, setIsEdit] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6 text-sm">
        <img className="w-36 rounded-full mx-auto" src={userData.image} alt="Profile" />
        
        {isEdit ? (
          <input
            className="bg-gray-100 text-3xl font-medium text-center mt-4 w-full p-2 rounded"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4 text-center">{userData.name}</p>
        )}

        <hr className="border-t border-gray-300" />
        
        <div>
          <p className="text-neutral-500 underline text-center">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700 mt-4">
            <p className="font-medium">Email: </p>
            <p className="text-blue-500">{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 p-2 rounded w-full"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  className="bg-gray-100 p-2 rounded"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  type="text"
                  placeholder="Address Line 1"
                />
                <input
                  className="bg-gray-100 p-2 rounded"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  type="text"
                  placeholder="Address Line 2"
                />
              </div>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline mt-3 text-center">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender</p>
            {isEdit ? (
              <select
                className="bg-gray-100 p-2 rounded"
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 p-2 rounded"
                type="date"
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                value={userData.dob}
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10 text-center">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsEdit(false)}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
