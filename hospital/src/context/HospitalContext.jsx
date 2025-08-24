import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const HospitalContext = createContext();

const HospitalContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [hToken, setHToken] = useState(localStorage.getItem("hToken") || "");
  const [profileData, setProfileData] = useState(null);
  const [dashData, setDashData] = useState(null);

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/hospital/profile`, {
        headers: { Authorization: `Bearer ${hToken}` },
      });
      if (data.success) {
        setProfileData(data.hospital);
      } else {
        setProfileData(false);
        toast.error(data.message);
      }
    } catch (error) {
      setProfileData(false);
      toast.error(error.message);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('hToken');
        setHToken('');
        toast.error('Session expired. Please login again.');
      }
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/hospital/dashboard`, {
        headers: { Authorization: `Bearer ${hToken}` },
      });
      if (data.success) {
        setDashData(data.data);
      } else {
        setDashData(false);
        toast.error(data.message);
      }
    } catch (error) {
      setDashData(false);
      toast.error(error.message);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('hToken');
        setHToken('');
        toast.error('Session expired. Please login again.');
      }
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/hospital/appointments/cancel/${appointmentId}`, {}, {
        headers: { Authorization: `Bearer ${hToken}` },
      });
      if (data.success) {
        toast.success(data.message);
        await getDashData(); // Refresh dashboard data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('hToken');
        setHToken('');
        toast.error('Session expired. Please login again.');
      }
    }
  };

  useEffect(() => {
    if (hToken) {
      getProfileData();
    }
  }, [hToken]);

  const value = {
    hToken,
    setHToken,
    backendUrl,
    profileData,
    getProfileData,
    dashData,
    getDashData,
    cancelAppointment,
  };

  return <HospitalContext.Provider value={value}>{props.children}</HospitalContext.Provider>;
};

export default HospitalContextProvider;