import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AdminPrescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};

  if (!appointment || !appointment.prescription) {
    return (
      <div className="p-5">
        <p>No prescription details found.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const { report, prescriptionFile } = appointment.prescription;

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Prescription Details</h2>
      
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700">
          <span className="text-blue-500">Patient:</span> {appointment.userData.name}
        </p>
        <p className="text-lg font-semibold text-gray-700">
          <span className="text-blue-500">Doctor:</span> {appointment.docData.name}
        </p>
        <p className="text-lg font-semibold text-gray-700">
          <span className="text-blue-500">Date:</span> {appointment.slotDate}, {appointment.slotTime}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Doctor's Report</h3>
        <p className="text-gray-700">{report}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Prescription File</h3>
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
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default AdminPrescription;
