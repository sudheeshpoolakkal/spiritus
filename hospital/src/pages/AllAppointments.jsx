import React, { useContext, useEffect, useState } from 'react'; // Added useContext here
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AllAppointments = () => {
  const { backendUrl, hToken } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/hospital/appointments`, { headers: { hToken } });
        if (data.success) setAppointments(data.appointments);
      } catch (error) {
        toast.error('Failed to load appointments');
      }
    };
    fetchAppointments();
  }, [backendUrl, hToken]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hospital Appointments</h1>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((apt) => (
            <li key={apt._id} className="border p-4 mb-2 rounded">{apt.patientName} - {apt.date}</li>
          ))}
        </ul>
      ) : (
        <p>No appointments yet.</p>
      )}
    </div>
  );
};

export default AllAppointments;