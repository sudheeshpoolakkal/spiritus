import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '₹';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
  const [userData, setUserData] = useState(false);
  const [appointments, setAppointments] = useState([]); // Added appointments state

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list');
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Add loadAppointments to refresh the appointments list
  const loadAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      if (data.success) {
        // For each completed & paid appointment, fetch prescription details
        const appointmentsWithPrescriptions = await Promise.all(
          data.appointments.map(async (appointment) => {
            if (appointment.isCompleted && appointment.payment) {
              try {
                const res = await axios.get(
                  `${backendUrl}/api/prescription/user/${appointment._id}`,
                  { headers: { token } }
                );
                if (res.data.success) {
                  return { ...appointment, prescription: res.data.prescription };
                }
              } catch (error) {
                console.warn(`No prescription for appointment ${appointment._id}`);
              }
            }
            return appointment;
          })
        );
        setAppointments(appointmentsWithPrescriptions.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
      loadAppointments();
    } else {
      setUserData(false);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    appointments,       // provide appointments
    loadAppointments,   // provide loadAppointments
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
