import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { DoctorContext } from '../../context/DoctorContext'
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl} = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {headers:{dToken}})
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  
  useEffect(() => {
    if(dToken) {
      getProfileData()
    }
  }, [dToken])
  
  return profileData && (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="md:flex">
          {/* Left column with image */}
          <div className="md:w-1/3 bg-gray-50 p-6 flex justify-center items-start">
            <img 
              className="bg-primary/80 w-full max-w-sm rounded-lg shadow-lg object-cover" 
              src={profileData.image} 
              alt={`Dr. ${profileData.name}`} 
            />
          </div>
          
          {/* Right column with information */}
          <div className="md:w-2/3 p-8">
            <div className="border-b pb-4 mb-4">
              <h1 className="text-3xl font-medium text-gray-700">{profileData.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-600">
                <p className="font-medium">{profileData.degree} - {profileData.speciality}</p>
                <span className="py-1 px-3 border text-sm rounded-full bg-gray-50">{profileData.experience}</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* About section */}
              <div>
                <h2 className="text-lg font-medium text-neutral-800 mb-2">About</h2>
                <p className="text-gray-600">
                  {profileData.about}
                </p>
              </div>
              
              {/* Fees section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">
                  Appointment fee: 
                  <span className="text-gray-800 ml-2">
                    {currency}
                    {isEdit ? 
                      <input 
                        type="number" 
                        className="w-24 p-1 border rounded ml-1" 
                        onChange={(e) => setProfileData(prev => ({...prev, fees: e.target.value}))} 
                        value={profileData.fees} 
                      /> : 
                      profileData.fees
                    }
                  </span>
                </p>
              </div>
              
              {/* Address section */}
              <div>
                <h2 className="text-lg font-medium text-neutral-800 mb-2">Location</h2>
                <div className="flex gap-2">
                  <div className="text-gray-600">
                    {isEdit ? (
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded" 
                          onChange={(e) => setProfileData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} 
                          value={profileData.address.line1} 
                        />
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded" 
                          onChange={(e) => setProfileData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} 
                          value={profileData.address.line2} 
                        />
                      </div>
                    ) : (
                      <p>
                        {profileData.address.line1}<br />
                        {profileData.address.line2}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Availability toggle */}
              <div className="flex items-center gap-2">
                <input 
                  onChange={() => isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} 
                  checked={profileData.available} 
                  type="checkbox" 
                  id="available" 
                  className="h-4 w-4"
                  disabled={!isEdit}
                />
                <label htmlFor="available" className="text-gray-700">Available for appointments</label>
              </div>
              
              {/* Action button */}
              <div className="pt-4">
                {isEdit ? (
                  <button 
                    onClick={updateProfile} 
                    className="px-6 py-2 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEdit(true)} 
                    className="px-6 py-2 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}