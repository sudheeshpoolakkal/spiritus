import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { dToken },
      });
      if (data.success) {
        const updatedAppointments = data.appointments.map((appointment) => ({
          ...appointment,
          prescription: appointment.prescription || null,
        }));
        setAppointments(updatedAppointments);
        console.log("Appointments with prescription data:", updatedAppointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment/",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment/",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const docId = localStorage.getItem("docId");
      if (!docId) {
        toast.error("Doctor id not found");
        console.log(docId);
        return;
      }
      const { data } = await axios.post(
        backendUrl + "/api/doctor/dashboard",
        { docId },
        { headers: { dToken } }
      );
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const setVideoCallLink = async (appointmentId, videoCallLink) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/set-video-call",
        { appointmentId, videoCallLink },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success("Video call link saved successfully!");
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addPrescription = async (formData) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/prescription/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          dToken,
        },
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Updated getDoctorPrescription: returns null if no prescription is found.
  const getDoctorPrescription = async (appointmentId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/prescription/doctor/${appointmentId}`,
        { headers: { dToken } }
      );
      if (data.success) {
        return data.prescription; // Could be null if no prescription exists
      } else {
        toast.error(data.message);
        return null;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return null;
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
    setVideoCallLink,
    addPrescription,
    getDoctorPrescription,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
