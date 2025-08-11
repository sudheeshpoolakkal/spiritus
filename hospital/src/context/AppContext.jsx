import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // Initialize from localStorage on first render
  const [hToken, setHToken] = useState(() => localStorage.getItem("hToken") || "");

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const currency = "₹";

  // Sync localStorage when token changes
  useEffect(() => {
    if (hToken) {
      localStorage.setItem("hToken", hToken);
    } else {
      localStorage.removeItem("hToken");
    }
  }, [hToken]);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const value = {
    hToken,
    setHToken,
    backendUrl,
    calculateAge,
    slotDateFormat,
    currency,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
