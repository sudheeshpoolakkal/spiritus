import React from 'react';
import { useLocation } from 'react-router-dom';

const DoctorViewPrescription = () => {
  const { state } = useLocation();
  const appointment = state?.appointment;

  if (!appointment || !appointment.prescription) {
    return <p>No prescription details available.</p>;
  }

  const { prescription } = appointment; // expecting properties like report and prescriptionFile

  return (
    <div className='max-w-3xl mx-auto p-5 bg-white shadow-lg rounded-lg'>
      <h2 className='text-3xl font-bold mb-6 text-blue-600'>Prescription Details</h2>
      <div className='mb-6'>
        <p className='text-lg font-semibold text-gray-700'>
          <span className='text-blue-500'>Patient Name:</span> {appointment.userData.name}
        </p>
        <p className='text-lg font-semibold text-gray-700'>
          <span className='text-blue-500'>Age:</span>{' '}
          {new Date().getFullYear() - new Date(appointment.userData.dob).getFullYear()} years
        </p>
        <p className='text-lg font-semibold text-gray-700'>
          <span className='text-blue-500'>Date:</span> {appointment.slotDate}
        </p>
      </div>
      <div className='mb-6'>
        <h3 className='text-2xl font-semibold mb-3'>Report</h3>
        <p className='text-gray-700'>{prescription.report}</p>
      </div>
      <div>
        <h3 className='text-2xl font-semibold mb-3'>Prescription File</h3>
        {prescription.prescriptionFile ? (
          prescription.prescriptionFile.endsWith('.pdf') ? (
            <a
              href={prescription.prescriptionFile}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              View PDF Prescription
            </a>
          ) : (
            <img
              src={prescription.prescriptionFile}
              alt='Prescription'
              className='w-48 h-48 object-cover rounded-lg shadow-md'
            />
          )
        ) : (
          <p>No file attached.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorViewPrescription;
