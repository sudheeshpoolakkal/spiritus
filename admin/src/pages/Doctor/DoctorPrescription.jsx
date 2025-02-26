import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DoctorContext } from '../../context/DoctorContext';

const DoctorPrescription = () => {
  const { appointmentId } = useParams();
  const { appointments } = useContext(DoctorContext);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (appointments.length > 0) {
      const foundAppointment = appointments.find((appt) => appt._id === appointmentId);
      setAppointment(foundAppointment);
      setLoading(false);
    }
  }, [appointmentId, appointments]);

  const handleUploadPrescription = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPrescriptionFile(file);
      alert('Prescription uploaded successfully!');
    }
  };

  if (loading) {
    return <p>Loading appointment details...</p>;
  }

  if (!appointment) {
    return <p className="text-red-500">Appointment not found.</p>;
  }

  return (
    <div className='w-full max-w-4xl m-5 p-5 bg-white border rounded shadow'>
      <h2 className='text-lg font-medium mb-3'>Prescription for {appointment.userData.name}</h2>
      <p><strong>Age:</strong> {appointment.userData.dob}</p>
      <p><strong>Date & Time:</strong> {appointment.slotDate}, {appointment.slotTime}</p>
      <p><strong>Payment:</strong> {appointment.payment ? 'Online' : 'Cash'}</p>
      <p><strong>Fees:</strong> {appointment.amount}</p>
      <label className='text-red-500 border border-red-500 px-2 py-1 rounded cursor-pointer mt-4 block'>
        If crucial, give a prescription
        <input
          type='file'
          accept='image/*,application/pdf'
          className='hidden'
          onChange={handleUploadPrescription}
        />
      </label>
      {prescriptionFile && <p className='text-green-500 mt-2'>Uploaded: {prescriptionFile.name}</p>}
    </div>
  );
};

export default DoctorPrescription;
