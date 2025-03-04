import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, FileText } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPrescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};

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
      toast.success('File downloaded successfully!', { position: 'bottom-right', autoClose: 3000 });
    } catch (error) {
      console.error('Download error: ', error);
      toast.error('Download failed. Please try again.', { position: 'bottom-right', autoClose: 3000 });
    }
  };

  if (!appointment || !appointment.prescription) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">No prescription details found.</p>
          <button 
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { report, prescriptionFile } = appointment.prescription;
  const isPDF = prescriptionFile.endsWith('.pdf');

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      
      <div className="grid md:grid-cols-[2fr_1fr] gap-8 bg-white shadow-lg rounded-lg p-6">
        {/* Main Content */}
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition duration-300"
          >
            <ArrowLeft className="mr-2" /> Back to Appointments
          </button>

          <h2 className="text-3xl font-bold mb-6 text-black">Prescription Details</h2>

          {/* Patient & Appointment Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="font-semibold text-gray-800">{appointment.userData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-semibold text-gray-800">{appointment.docData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold text-gray-800">{appointment.slotDate}, {appointment.slotTime}</p>
              </div>
            </div>
          </div>

          {/* Doctor's Report */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Doctor's Report</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-normal">{report}</p>
          </div>
        </div>

        {/* Prescription File Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-black mb-4">Prescription File</h3>
          
          {isPDF ? (
            <div className="flex flex-col space-y-4">
              <a
                href={prescriptionFile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition duration-300"
              >
                <FileText className="w-4 h-4" />
                <span>View PDF</span>
              </a>
              <button
                onClick={() => handleDownload(prescriptionFile, 'prescription.pdf')}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          ) : (
            <div>
              <img
                src={prescriptionFile}
                alt="Prescription"
                className="w-full h-auto rounded-lg shadow-md mb-4"
              />
              <button
                onClick={() => handleDownload(prescriptionFile, 'prescription.jpg')}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download Image</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPrescription;