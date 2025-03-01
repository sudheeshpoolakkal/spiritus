import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserPrescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};

  if (!appointment || !appointment.prescription) {
    return (
      <div className="p-5">
        <p>No prescription details available.</p>
        <button onClick={() => navigate(-1)} className="bg-blue-600 text-white px-4 py-2 rounded">
          Go Back
        </button>
      </div>
    );
  }

  const { report, prescriptionFile } = appointment.prescription;

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Prescription Details</h2>
      <div className="mb-4">
        <p className="font-semibold text-gray-700">Doctor's Report:</p>
        <p className="text-gray-600">{report}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold text-gray-700">Prescription File:</p>
        {prescriptionFile.endsWith('.pdf') ? (
          <a
            href={prescriptionFile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View PDF
          </a>
        ) : (
          <img
            src={prescriptionFile}
            alt="Prescription"
            className="w-64 h-64 object-cover rounded-lg shadow-md"
          />
        )}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default UserPrescription;
