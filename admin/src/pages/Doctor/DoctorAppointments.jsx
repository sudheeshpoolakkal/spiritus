import React, { useState, useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as LucideCalendar,
  DollarSign as LucideMoney,
  CreditCard as LucidePayment,
  Award as LucideBadge,
  ChevronLeft as LucideArrowLeft,
  FileText as LucideDescription,
  PlusCircle as LucideAddCircle,
  Video as LucideVideoCamera,
} from "lucide-react";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    setVideoCallLink,
    getDoctorPrescription, // new function from context
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [videoCallLinks, setVideoCallLinks] = useState({});
  const [joinedMeetings, setJoinedMeetings] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAppointments();
  }, [dToken]);

  useEffect(() => {
    if (appointments.length > 0) {
      const links = {};
      appointments.forEach((appointment) => {
        if (appointment.videoCallLink) {
          links[appointment._id] = appointment.videoCallLink;
        }
      });
      setVideoCallLinks(links);
    }
  }, [appointments]);

  // When an appointment is selected, fetch its prescription (if any)
  useEffect(() => {
    if (selectedAppointment && selectedAppointment._id) {
      const fetchPrescription = async () => {
        try {
          const data = await getDoctorPrescription(selectedAppointment._id);
          setSelectedPrescription(data);
        } catch (err) {
          console.error("Error fetching prescription:", err);
          setSelectedPrescription(null);
        }
      };
      fetchPrescription();
    } else {
      setSelectedPrescription(null);
    }
  }, [selectedAppointment, getDoctorPrescription]);

  const handleSetVideoCallLink = async (appointmentId) => {
    const link = prompt(
      "Enter video call link (e.g., https://meet.example.com):"
    );
    if (link) {
      const formattedLink =
        link.startsWith("http://") || link.startsWith("https://")
          ? link
          : `https://${link}`;
      await setVideoCallLink(appointmentId, formattedLink);
      setVideoCallLinks((prev) => ({
        ...prev,
        [appointmentId]: formattedLink,
      }));
    }
  };

  const handleJoinMeetingClick = (appointmentId, link) => {
    setJoinedMeetings((prev) => ({ ...prev, [appointmentId]: true }));
    window.open(link, "_blank");
  };

  // Navigation function for creating a prescription.
  // (When a prescription exists, view it; otherwise, create one.)
  const handleCreatePrescription = (appointment) => {
    navigate("/doctor-prescription", {
      state: { appointment, prescription: selectedPrescription },
    });
  };

  const handleViewPrescription = (appointment) => {
    navigate("/doctor-view-prescription", {
      state: { appointment, prescription: selectedPrescription },
    });
  };

  const panelVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="w-full mx-3 md:mx-5 my-4">
      {/* Mobile View Selection Tab */}
      <div className="md:hidden flex justify-between bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <button
          className={`flex-1 py-3 text-center transition-colors ${
            !selectedAppointment
              ? "bg-blue-500 text-white font-medium"
              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setSelectedAppointment(null)}
        >
          Appointments
        </button>
        <button
          className={`flex-1 py-3 text-center transition-colors ${
            selectedAppointment
              ? "bg-blue-500 text-white font-medium"
              : "bg-gray-50 text-gray-600"
          }`}
          disabled={!selectedAppointment}
        >
          Details
        </button>
      </div>

      {/* Desktop and Mobile Layout Container */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Appointments List */}
        <div
          className={`w-full md:w-8/12 ${
            selectedAppointment ? "hidden md:block" : ""
          }`}
        >
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                Appointments
              </h2>
              <p className="text-sm text-gray-500">
                {appointments.length} total appointments
              </p>
            </div>

            <div className="overflow-y-auto max-h-[75vh]">
              {/* Mobile List */}
              <div className="sm:hidden">
                {appointments.length === 0 ? (
                  <div className="p-3 text-center text-gray-500">
                    No appointments found.
                  </div>
                ) : (
                  appointments
                    .slice()
                    .reverse()
                    .map((item) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedAppointment?._id === item._id
                            ? "bg-blue-50"
                            : ""
                        }`}
                        onClick={() => setSelectedAppointment(item)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              className="w-10 h-10 rounded-full object-cover shadow-sm"
                              src={item.userData?.image || assets.defaultImage}
                              alt={item.userData?.name || "Patient"}
                            />
                            <div>
                              <h3 className="text-sm font-medium text-gray-800">
                                {item.userData?.name || "Unknown"}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {slotDateFormat(item.slotDate)}, {item.slotTime}
                              </p>
                            </div>
                          </div>
                          <StatusBadge item={item} />
                        </div>
                      </motion.div>
                    ))
                )}
              </div>

              {/* Desktop List */}
              <div className="max-sm:hidden">
                <div className="grid grid-cols-[40px_1fr_1fr_100px] gap-3 px-4 py-2 bg-gray-50 text-xs font-medium text-gray-600">
                  <span>#</span>
                  <span>Patient</span>
                  <span>Date & Time</span>
                  <span>Status</span>
                </div>
                {appointments.length === 0 ? (
                  <div className="p-3 text-center text-gray-500">
                    No appointments found.
                  </div>
                ) : (
                  appointments
                    .slice()
                    .reverse()
                    .map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`grid grid-cols-[40px_1fr_1fr_100px] gap-3 items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedAppointment?._id === item._id
                            ? "bg-blue-50"
                            : ""
                        }`}
                        onClick={() => setSelectedAppointment(item)}
                      >
                        <span className="text-gray-500 text-sm">
                          {index + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <img
                            className="w-8 h-8 rounded-full object-cover shadow-sm"
                            src={item.userData?.image || assets.defaultImage}
                            alt={item.userData?.name || "Patient"}
                          />
                          <span className="text-sm font-medium text-gray-800 truncate">
                            {item.userData?.name || "Unknown"}
                          </span>
                        </div>
                        <div>
                          <p className="text-gray-800 text-sm">
                            {slotDateFormat(item.slotDate)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.slotTime}
                          </p>
                        </div>
                        <StatusBadge item={item} />
                      </motion.div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Details Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAppointment?._id || "empty"}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`w-full md:w-6/12 ${
              !selectedAppointment ? "hidden md:block" : ""
            }`}
          >
            <div className="bg-white shadow-md rounded-lg overflow-hidden h-full">
              {selectedAppointment ? (
                <div className="p-4 md:p-5 overflow-y-auto max-h-[70vh]">
                  <div className="flex justify-between items-start mb-5">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Appointment Details
                    </h2>
                    <button
                      className="md:hidden flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                      onClick={() => setSelectedAppointment(null)}
                    >
                      <LucideArrowLeft size={20} />
                      <span className="ml-1 text-sm font-medium">
                        Back to list
                      </span>
                    </button>
                  </div>

                  {/* Patient Card */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <img
                        src={
                          selectedAppointment.userData?.image ||
                          assets.defaultImage
                        }
                        alt={selectedAppointment.userData?.name || "Patient"}
                        className="w-14 h-14 rounded-full object-cover shadow-sm"
                      />
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-800">
                          {selectedAppointment.userData?.name || "Unknown"}
                        </h3>
                        <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
                          <div>
                            <span className="text-gray-500">Age:</span>{" "}
                            {calculateAge(selectedAppointment.userData?.dob) ||
                              "–"}
                          </div>
                          <div>
                            <span className="text-gray-500">Gender:</span>{" "}
                            {selectedAppointment.userData?.gender || "–"}
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">Email:</span>{" "}
                            <a
                              href={`mailto:${selectedAppointment.userData?.email}`}
                              className="text-blue-500 hover:underline"
                            >
                              {selectedAppointment.userData?.email || "–"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Patient Description */}
                  {selectedAppointment.patientDescription && (
                    <div className="mb-5">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Patient Notes
                      </h4>
                      <div className="bg-white border border-gray-100 rounded-lg p-3 text-sm text-gray-600 leading-relaxed">
                        {selectedAppointment.patientDescription}
                      </div>
                    </div>
                  )}

                  {/* Voice Message Section */}
                  {selectedAppointment.audioMessage && (
                    <div className="mb-5">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Voice Message
                      </h4>
                      <div className="bg-white border border-gray-100 rounded-lg p-3">
                        <audio
                          controls
                          src={selectedAppointment.audioMessage}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Appointment Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <InfoCard
                      icon={<LucideCalendar size={20} />}
                      title="Date & Time"
                      value={`${slotDateFormat(
                        selectedAppointment.slotDate
                      )}, ${selectedAppointment.slotTime}`}
                    />
                    <InfoCard
                      icon={<LucidePayment size={20} />}
                      title="Payment"
                      value={
                        selectedAppointment.payment
                          ? "Paid Online"
                          : "Cash Payment"
                      }
                    />
                    <InfoCard
                      icon={<LucideMoney size={20} />}
                      title="Fee"
                      value={`${currency}${selectedAppointment.amount}`}
                    />
                    <InfoCard
                      icon={<LucideBadge size={20} />}
                      title="Status"
                      value={<StatusBadge item={selectedAppointment} />}
                    />
                  </div>

                  {/* Action Buttons or Cancelled Message */}
                  {selectedAppointment.cancelled ? (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                      This appointment has been cancelled.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {!selectedAppointment.isCompleted ? (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <ActionButton
                            icon={assets.cancel_icon}
                            label="Cancel Appointment"
                            color="red"
                            onClick={() =>
                              cancelAppointment(selectedAppointment._id)
                            }
                            confirm
                          />
                          <ActionButton
                            icon={assets.tick_icon}
                            label="Mark Completed"
                            color="green"
                            onClick={() =>
                              completeAppointment(selectedAppointment._id)
                            }
                          />
                        </div>
                      ) : (
                        <VideoCallSection
                          appointment={selectedAppointment}
                          videoCallLinks={videoCallLinks}
                          handleSetVideoCallLink={handleSetVideoCallLink}
                          handleJoinMeetingClick={handleJoinMeetingClick}
                          joinedMeetings={joinedMeetings}
                          handleCreatePrescription={handleCreatePrescription}
                          handleViewPrescription={handleViewPrescription}
                          prescription={selectedPrescription}
                        />
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-6 text-gray-400 text-sm">
                  <p className="text-center">
                    Select an appointment from the list to view details
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper Components
const StatusBadge = ({ item, className }) => {
  const statusColors = {
    cancelled: { bg: "bg-red-100", text: "text-red-700" },
    completed: { bg: "bg-green-100", text: "text-green-700" },
    pending: { bg: "bg-blue-100", text: "text-blue-700" },
  };

  const status = item.cancelled
    ? "cancelled"
    : item.isCompleted
    ? "completed"
    : "pending";

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        statusColors[status].bg
      } ${statusColors[status].text} ${className || ""}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 shadow-sm">
    <span className="text-gray-500">{icon}</span>
    <div>
      <h5 className="text-xs font-medium text-gray-500">{title}</h5>
      <p className="text-gray-800 text-sm">{value}</p>
    </div>
  </div>
);

const ActionButton = ({ icon, label, color, onClick, confirm }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (confirm && !showConfirm) {
      setShowConfirm(true);
      return;
    }
    onClick();
    setShowConfirm(false);
  };

  return (
    <div className="relative flex-1">
      <button
        className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
          color === "red"
            ? "bg-red-50 text-red-700 hover:bg-red-100"
            : "bg-green-50 text-green-700 hover:bg-green-100"
        }`}
        onClick={handleClick}
      >
        <img src={icon} className="w-4 h-4" alt={label} />
        <span className="font-medium">{label}</span>
      </button>

      {showConfirm && (
        <div className="absolute inset-0 bg-white flex items-center justify-center gap-2 px-2">
          <button
            className="text-red-600 hover:text-red-700 font-medium text-sm"
            onClick={handleClick}
          >
            Confirm
          </button>
          <button
            className="text-gray-500 hover:text-gray-600 text-sm"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

// Updated VideoCallSection component - shows "Create Prescription" if no prescription exists,
// otherwise it shows "View Prescription" immediately.
const VideoCallSection = ({
  appointment,
  videoCallLinks,
  handleSetVideoCallLink,
  handleJoinMeetingClick,
  joinedMeetings,
  handleCreatePrescription,
  handleViewPrescription,
  prescription,
}) => (
  <div className="space-y-3">
    {videoCallLinks[appointment._id] ? (
      <>
        <div className="bg-blue-50 rounded-lg p-3 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              <h4 className="text-xs font-medium text-blue-800 mb-1">
                Video Call Link
              </h4>
              <a
                href={videoCallLinks[appointment._id]}
                onClick={(e) => {
                  e.preventDefault();
                  handleJoinMeetingClick(
                    appointment._id,
                    videoCallLinks[appointment._id]
                  );
                }}
                className="text-blue-500 hover:underline break-all text-sm"
              >
                {videoCallLinks[appointment._id]}
              </a>
            </div>
            <button
              onClick={() => handleSetVideoCallLink(appointment._id)}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {prescription ? (
            <button
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm"
              onClick={() => handleViewPrescription(appointment)}
            >
              <LucideDescription size={16} />
              View Prescription
            </button>
          ) : (
            <button
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm"
              onClick={() => handleCreatePrescription(appointment)}
            >
              <LucideAddCircle size={16} />
              Create Prescription
            </button>
          )}
        </div>
      </>
    ) : (
      <button
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
        onClick={() => handleSetVideoCallLink(appointment._id)}
      >
        <LucideVideoCamera size={16} />
        Add Video Call Link
      </button>
    )}
  </div>
);

export default DoctorAppointments;
