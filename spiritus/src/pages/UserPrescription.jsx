import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from "lucide-react";
import { AppContext } from '../context/AppContext';

const UserPrescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getPrescription } = useContext(AppContext);
  const { appointment } = location.state || {};

  const [prescriptionData, setPrescriptionData] = useState(null);

  useEffect(() => {
    if (appointment && appointment._id) {
      getPrescription(appointment._id).then((data) => {
        setPrescriptionData(data);
      });
    }
  }, [appointment, getPrescription]);

  if (!appointment || !prescriptionData) {
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

  const { report, prescriptionFile } = prescriptionData;

  // Helper function to download files
  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error('Network response was not ok');
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
    <div className="max-w-5xl mx-auto p-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={18} />
        <span className="ml-2">Back to Appointments</span>
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6">Prescription Details</h2>
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold text-gray-700 text-lg mb-2">Doctor's Report</p>
            <p className="text-gray-600 whitespace-pre-line">{report}</p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-4">Prescription File</h3>
          <div className="border border-gray-300 rounded-md p-4 mb-4">
            <img
              src={prescriptionFile}
              alt="Prescription"
              className="w-full h-auto rounded-lg shadow-md mb-3"
            />
          </div>
          <button
            onClick={() => handleDownload(prescriptionFile, 'prescription_image.jpg')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Download size={18} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPrescription;
