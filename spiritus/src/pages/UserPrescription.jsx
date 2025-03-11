import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserPrescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};

  if (!appointment || !appointment.prescription) {
    return (
      <div className="p-5">
        <p>No prescription or report available.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }
  

  

  // Destructure prescription details. Use a fallback to avoid errors.
  const { report, prescriptionFile } = appointment.prescription || {};

  // Custom download handler to fetch the file as a blob and trigger a download.
  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Prescription Details</h2>
      <div className="mb-4">
        <p className="font-semibold text-gray-700">Doctor's Report:</p>
        <p className="text-gray-600">{report}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold text-gray-700">Prescription File:</p>
        {prescriptionFile && typeof prescriptionFile === 'string' ? (
          prescriptionFile.toLowerCase().endsWith('.pdf') ? (
            <>
              <a
                href={prescriptionFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View PDF
              </a>
              <button
                onClick={() => handleDownload(prescriptionFile, 'prescription.pdf')}
                className="block mt-2 text-blue-500 underline"
              >
                Download PDF
              </button>
            </>
          ) : (
            <>
              <img
                src={prescriptionFile}
                alt="Prescription"
                className="w-64 h-64 object-cover rounded-lg shadow-md"
              />
              <button
                onClick={() => handleDownload(prescriptionFile, 'prescription_image.jpg')}
                className="block mt-2 text-blue-500 underline"
              >
                Download Image
              </button>
            </>
          )
        ) : (
          <p className="text-gray-600">No prescription file available.</p>
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
