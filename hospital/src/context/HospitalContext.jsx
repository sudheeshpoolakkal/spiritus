import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const HospitalContext = createContext();

const HospitalContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [hToken, setHToken] = useState(localStorage.getItem("hToken") ? localStorage.getItem("hToken") : "");
  const [profileData, setProfileData] = useState(null);
  const [dashData, setDashData] = useState(false); // For future dashboard stats if needed

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/hospital/profile", {
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

  const value = {
    hToken,
    setHToken,
    backendUrl,
    profileData,
    getProfileData,
    dashData,
  };

  return <HospitalContext.Provider value={value}>{props.children}</HospitalContext.Provider>;
};

export default HospitalContextProvider;