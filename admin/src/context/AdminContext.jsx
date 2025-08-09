import { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctorRegistrations, setDoctorRegistrations] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } });
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { headers: { aToken } });
      if (data.success) {
        const appointmentsWithPrescriptions = await Promise.all(
          data.appointments.map(async (appointment) => {
            if (appointment.isCompleted) {
              try {
                const prescriptionRes = await axios.get(
                  `${backendUrl}/api/prescription/admin/${appointment._id}`,
                  { headers: { aToken } }
                );
                if (prescriptionRes.data.success) {
                  return { ...appointment, prescription: prescriptionRes.data.prescription };
                }
              } catch (error) {
                console.warn(`No prescription found for appointment ${appointment._id}`);
              }
            }
            return { ...appointment, prescription: null };
          })
        );
        setAppointments(appointmentsWithPrescriptions);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/cancel-appointment',
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getPrescriptions = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/prescription/admin`, { headers: { aToken } });
      if (data.success) {
        setPrescriptions(data.prescriptions);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getAllFeedbacks = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/feedbacks`, { headers: { aToken } });
      if (data.success) {
        setFeedbacks(data.feedbacks);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const markFeedbackAsRead = async (feedbackId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/mark-feedback-read`,
        { feedbackId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllFeedbacks();
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const deleteFeedback = async (feedbackId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/delete-feedback`,
        { feedbackId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllFeedbacks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getAllHospitals = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/hospitals`, { headers: { aToken } });
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

  const getAllDoctorRegistrations = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/doctor-registrations`, { headers: { aToken } });
      if (data.success) {
        setDoctorRegistrations(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const markHospitalAsReviewed = async (hospitalId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/mark-hospital-reviewed`,
        { hospitalId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllHospitals();
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const markDoctorRegistrationAsReviewed = async (doctorId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/mark-doctor-registration-reviewed`,
        { doctorId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctorRegistrations();
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const deleteHospital = async (hospitalId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/delete-hospital`,
        { hospitalId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllHospitals();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const deleteDoctorRegistration = async (doctorId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/delete-doctor-registration`,
        { doctorId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctorRegistrations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
    prescriptions,
    getPrescriptions,
    feedbacks,
    getAllFeedbacks,
    markFeedbackAsRead,
    deleteFeedback,
    hospitals,
    getAllHospitals,
    doctorRegistrations,
    getAllDoctorRegistrations,
    markHospitalAsReviewed,
    markDoctorRegistrationAsReviewed,
    deleteHospital,
    deleteDoctorRegistration,
  };

  return <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>;
};

export default AdminContextProvider;