import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
// Example icon usage (Lucide)
import { ArrowLeft, Download } from "lucide-react";

const DoctorViewPrescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};
  const { getDoctorPrescription } = useContext(DoctorContext);

  const [prescriptionData, setPrescriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper: safely format date or use fallback if invalid
  const formatDate = (rawDate) => {
    // Fallback date format if invalid
    let fallback = "11.3.2025, 01:00 PM";
    if (!rawDate) return fallback;

    const dateObj = new Date(rawDate);
    if (isNaN(dateObj.getTime())) return fallback;

    // Format as: day.month.year, hh:mm AM/PM
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    let hour = dateObj.getHours();
    const minute = String(dateObj.getMinutes()).padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    return `${day}.${month}.${year}, ${hour}:${minute} ${ampm}`;
  };

  useEffect(() => {
    const fetchPrescription = async () => {
      if (appointment && appointment._id) {
        try {
          const data = await getDoctorPrescription(appointment._id);
          if (data) {
            setPrescriptionData(data);
          }
        } catch (err) {
          setError("Failed to fetch prescription.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [appointment, getDoctorPrescription]);

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <p className="text-gray-600">Loading prescription...</p>
      </div>
    );
  }

  if (error || !prescriptionData) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
          <p className="text-red-500 text-lg mb-4">
            {error || "No prescription available for this appointment."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  // Destructure the prescription details (adjust the keys if needed)
  const {
    report = "",
    prescriptionFile: fileUrl,
    // fileType,
    fileName,
  } = prescriptionData;

  // Patient and date fallback
  const patientName = appointment?.userData?.name || "Unknown Patient";
  const displayDate = formatDate(appointment?.slotDate);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Top Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-blue-600 hover:text-blue-700 font-medium"
      >
        <ArrowLeft size={20} />
        <span>Back to Appointments</span>
      </button>

      {/* Main Container */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Prescription Details
        </h1>

        {/* Info Row */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Panel: Patient & Date Info */}
          <div className="flex-1 bg-gray-50 p-4 rounded-lg">
            <div className="mb-3">
              <h2 className="text-sm text-gray-500 font-semibold uppercase">
                Patient
              </h2>
              <p className="text-gray-800 text-lg font-medium">{patientName}</p>
            </div>

            <div className="mb-3">
              <h2 className="text-sm text-gray-500 font-semibold uppercase">
                Date
              </h2>
              <p className="text-gray-800 text-lg font-medium">{displayDate}</p>
            </div>
          </div>

          {/* Right Panel: Prescription File */}
          <div className="flex-1">
            <div className="bg-gray-50 p-4 rounded-lg h-full flex flex-col justify-between">
              <h2 className="text-sm text-gray-500 font-semibold uppercase mb-3">
                Prescription File
              </h2>
              {fileUrl ? (
                // Always display as image if fileUrl exists
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={fileUrl}
                    alt="Prescription"
                    className="max-h-48 rounded-lg shadow-md"
                  />
                  <a
                    href={fileUrl}
                    download={fileName || "prescription"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium mt-2"
                  >
                    <Download size={18} />
                    Download
                  </a>
                </div>
              ) : (
                <p className="text-gray-500">No file available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Doctor's Report */}
        <div className="mt-6">
          <h2 className="text-sm text-gray-500 font-semibold uppercase mb-2">
            Doctor's Report
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-700 leading-relaxed">
            {report || "No report provided."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorViewPrescription;
