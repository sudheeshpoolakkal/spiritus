import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import bg3 from '@/assets/assets_frontend/aurora.webp';

const CompleteProfile = () => {
  const { backendUrl, token, loadUserProfileData, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    dob: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        name: userData.name,
        address: JSON.stringify(formData.address),
      };
      const { data } = await axios.put(
        `${backendUrl}/api/user/update-profile`,
        payload,
        { headers: { token } }
      );

      if (data.success) {
        toast.success('Profile updated successfully!');
        await loadUserProfileData();
        navigate('/questionnaire');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg3})` }}
    >
      <div className="bg-[#242425] p-8 rounded-3xl shadow-lg w-full max-w-lg text-zinc-200">
        <h2 className="text-2xl font-bold text-center mb-8">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block mb-1">Address</label>
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleAddressChange}
              className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleAddressChange}
              className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleAddressChange}
              className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={formData.address.zip}
              onChange={handleAddressChange}
              className="w-full p-2 rounded-lg border border-zinc-300 bg-[#333335] text-zinc-200"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:bg-indigo-300"
          >
            {isSubmitting ? 'Saving...' : 'Save and Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
