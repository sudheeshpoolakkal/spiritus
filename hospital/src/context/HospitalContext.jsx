import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const HospitalContext = createContext();

const HospitalContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [hToken, setHToken] = useState(localStorage.getItem("hToken") ? localStorage.getItem("hToken") : "");
  const [profileData, setProfileData] = useState(false);
  const [dashData, setDashData] = useState(false); // For future dashboard stats if needed

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/hospital/profile", {
        headers: { Authorization: `Bearer ${hToken}` },
      });
      if (data.success) {
        setProfileData(data.hospital);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Optional: If you add a dashboard endpoint later, fetch stats here
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/hospital/dashboard", {
        headers: { Authorization: `Bearer ${hToken}` },
      });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    hToken,
    setHToken,
    backendUrl,
    profileData,
    getProfileData,
    dashData,
    getDashData,
  };

  return <HospitalContext.Provider value={value}>{props.children}</HospitalContext.Provider>;
};

export default HospitalContextProvider;