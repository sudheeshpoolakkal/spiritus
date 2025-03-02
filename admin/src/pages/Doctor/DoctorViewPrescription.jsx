import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DoctorViewPrescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};

  if (!appointment || !appointment.prescription) {
    return (
      <div className="max-w-3xl mx-auto p-5">
        <p className="text-red-500">No prescription available for this appointment.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { report, fileUrl, fileType, fileName } = appointment.prescription;

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">View Prescription</h2>
      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-700">
          <span className="text-blue-500">Patient Name:</span> {appointment.userData.name}
        </p>
        <p className="text-lg font-semibold text-gray-700">
          <span className="text-blue-500">Date:</span>{" "}
          {new Date(appointment.slotDate).toLocaleDateString()}
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Report:</h3>
        <p className="text-gray-700 whitespace-pre-line">{report}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Prescription File:</h3>
        {fileUrl && fileType && fileType.startsWith("image/") ? (
          <div>
            <img
              src={fileUrl}
              alt="Prescription Preview"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
            <a
              href={fileUrl}
              download={fileName || "prescription"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block"
            >
              Download Image
            </a>
          </div>
        ) : fileUrl ? (
          <a
            href={fileUrl}
            download={fileName || "prescription.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Download PDF
          </a>
        ) : (
          <p className="text-gray-700">No file available.</p>
        )}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default DoctorViewPrescription;
