import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]); // NEW: State for hospitals
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // NEW: Function to fetch hospitals
  const getHospitalsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/hospital/list");
      if (data.success) {
        setHospitals(data.hospitals);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const loadAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
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

  // Added getPrescription function to fetch a prescription by appointment ID
  const getPrescription = async (appointmentId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/prescription/user/${appointmentId}`,
        { headers: { token } }
      );
      if (data.success) {
        return data.prescription;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // New function to get doctor with fresh custom_slots data
  const getDoctorById = async (docId) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/${docId}`);
      if (data.success) {
        return data.doctor;
      }
    } catch (error) {
      console.error("Error fetching doctor by ID:", error);
    }
    return null;
  };

  useEffect(() => {
    getDoctorsData();
    getHospitalsData(); // NEW: Fetch hospitals on mount
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
      loadAppointments();
    } else {
      setUserData(false);
    }
  }, [token]);

  // Logout function clears token and userData then navigates to login.
  const logout = () => {
    console.log("Executing logout");
    localStorage.removeItem("token");
    setToken(false);
    setUserData(false);
    navigate("/login");
  };

  const value = {
    doctors,
    getDoctorsData,
    hospitals, // NEW
    getHospitalsData, // NEW
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    appointments,
    loadAppointments,
    logout, // expose logout
    getPrescription, // added getPrescription to context value
    getDoctorById, // added getDoctorById to context value
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;