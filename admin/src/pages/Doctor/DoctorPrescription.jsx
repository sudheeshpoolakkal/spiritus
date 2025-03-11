import React, { useState, useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ImSpinner8 } from "react-icons/im";

const DoctorPrescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dToken, getAppointments } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);
  const appointment = location.state?.appointment;

  const [report, setReport] = useState(appointment.prescription?.report || "");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(
    appointment.prescription?.prescriptionFile
      ? `data:${appointment.prescription.contentType};base64,${appointment.prescription.prescriptionFile}`
      : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Calculate age function
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handle file change with preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  // Handle form submission with confirmation
  const handleSubmit = async () => {
    const wordCount = report.trim().split(/\s+/).length;
    if (wordCount < 30) {
      toast.error(`The report should have at least 30 words. Current count: ${wordCount}`);
      return;
    }
    if (!file && !appointment.prescription?.prescriptionFile) {
      toast.error("Please upload a prescription file.");
      return;
    }
  
    if (window.confirm("Are you sure you want to add this prescription?")) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("appointmentId", appointment._id);
      formData.append("report", report);
      if (file) formData.append("prescriptionFile", file);
      try {
        // Remove "Content-Type" header so that Axios can set it automatically.
        await axios.post("http://localhost:4000/api/prescription/add", formData, {
          headers: { dToken },
        });
        toast.success("Prescription added successfully!");
        await getAppointments();
        setTimeout(() => navigate("/doctor-appointments"), 2000);
      } catch (error) {
        toast.error("Error uploading prescription. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  

  // Word and character count
  const wordCount = report.trim().split(/\s+/).length;
  const charCount = report.length;

  // Determine if this is a view or add mode
  const isViewMode = !!appointment.prescription?.report;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-5 text-blue-600" id="prescription-title">
          Prescription
        </h2>

        {/* Patient Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              <span className="text-blue-500">Patient Name:</span> {appointment.userData.name}
            </p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              <span className="text-blue-500">Age:</span> {calculateAge(appointment.userData.dob)} years
            </p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              <span className="text-blue-500">Date:</span> {slotDateFormat(appointment.slotDate)}
            </p>
          </div>
        </div>

        {isViewMode ? (
          <>
            {/* View Mode: Read-Only Prescription */}
            <div className="mb-5 bg-gray-100 p-3 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prescription Report
              </label>
              <p className="border border-gray-200 rounded-lg p-3 text-sm text-gray-800 bg-white">
                {report}
              </p>
            </div>
            {filePreview && (
              <div className="mb-5 bg-gray-100 p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prescription File
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <p className="text-sm font-medium text-gray-700">File Preview:</p>
                    {appointment.prescription.contentType.startsWith("image/") ? (
                      <img
                        src={filePreview}
                        alt="Prescription Preview"
                        className="mt-2 w-full h-32 object-cover rounded-lg lazyload"
                        loading="lazy"
                      />
                    ) : (
                      <p className="text-sm text-gray-600 mt-2">
                        PDF file: {appointment.prescription.originalName}
                      </p>
                    )}
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <a
                      href={filePreview}
                      download={appointment.prescription.originalName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm underline block mt-2"
                    >
                      Download {appointment.prescription.contentType.startsWith("image/") ? "Image" : "PDF"}
                    </a>
                  </div>
                </div>
              </div>
            )}
            <div className="p-4 bg-gray-50">
              <button
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center disabled:bg-blue-400"
                onClick={() =>
                  navigate("/doctor-view-prescription", { state: { appointment } })
                }
                aria-label="View Prescription"
              >
                View Prescription
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Add Mode: Editable Prescription */}
            <div className="mb-5 bg-gray-100 p-3 rounded-lg">
              <label
                htmlFor="report"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Patient Report (Minimum 30 words)
              </label>
              <textarea
                id="report"
                className="w-full h-32 border border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                placeholder="Write the patient’s report here..."
                value={report}
                onChange={(e) => setReport(e.target.value)}
                aria-describedby="word-count"
              ></textarea>
              <div className="flex justify-between mt-1">
                <p
                  id="word-count"
                  className={`text-xs ${wordCount < 30 ? "text-red-500" : "text-gray-500"}`}
                >
                  Words: {wordCount} {wordCount < 30 && "(Minimum 30 required)"}
                </p>
                <p className="text-xs text-gray-500">Chars: {charCount}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div
                  className="bg-blue-500 h-1 rounded-full"
                  style={{ width: `${Math.min((wordCount / 30) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-5 bg-gray-100 p-3 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Prescription (PDF or Image)
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                accept=".pdf,.jpg,.jpeg,.png"
                aria-label="Upload prescription file"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-blue-500 text-sm"
              >
                Or drag and drop a file here
              </button>
              {filePreview && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <p className="text-sm font-medium text-gray-700">File Preview:</p>
                    {file.type.startsWith("image/") ? (
                      <img
                        src={filePreview}
                        alt="File Preview"
                        className="mt-2 w-full h-32 object-cover rounded-lg lazyload"
                        loading="lazy"
                      />
                    ) : (
                      <p className="text-sm text-gray-600 mt-2">PDF file: {file.name}</p>
                    )}
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <a
                      href={filePreview}
                      download={file.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm underline block mt-2"
                    >
                      Download {file.type.startsWith("image/") ? "Image" : "PDF"}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50">
              <button
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center disabled:bg-blue-400"
                onClick={handleSubmit}
                disabled={isLoading}
                aria-label="Add Prescription"
              >
                {isLoading ? <ImSpinner8 className="animate-spin mr-2" /> : "Add Prescription"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorPrescription;