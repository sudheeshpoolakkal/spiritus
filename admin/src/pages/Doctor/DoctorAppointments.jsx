import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";
import { useNavigate } from "react-router-dom";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    setVideoCallLink,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [videoCallLinks, setVideoCallLinks] = useState({});
  // joinedMeetings tracks appointments whose meeting link has been clicked
  const [joinedMeetings, setJoinedMeetings] = useState({});
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

  const handleSetVideoCallLink = async (appointmentId) => {
    const link = prompt("Enter video call link:");
    if (link) {
      await setVideoCallLink(appointmentId, link);
      setVideoCallLinks((prev) => ({ ...prev, [appointmentId]: link }));
    }
  };

  // When a meeting link is clicked, mark that appointment as joined and open the link.
  const handleJoinMeetingClick = (appointmentId, link) => {
    setJoinedMeetings((prev) => ({ ...prev, [appointmentId]: true }));
    window.open(link, "_blank");
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        {/* Grid Header */}
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date and Time</p>
          <p>Fees</p>
          <p>Action</p>
          <p>Meeting</p>
          <p>Prescription</p>
        </div>
        {appointments.slice().reverse().map((item, index) => (
          <div
            key={item._id}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-20 rounded-full"
                src={item.userData.image}
                alt="Patient"
              />
              <p>{item.userData.name}</p>
            </div>
            {/* Payment Column */}
            <p className="text-xs inline border border-primary px-2 rounded-full">
              {item.payment ? "Online" : "Cash"}
            </p>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>
            {/* Action Column */}
            {item.cancelled ? (
              <p className="text-red-500">Cancelled</p>
            ) : item.isCompleted ? (
              <>
                <p className="text-green-600">Completed</p>
                {videoCallLinks[item._id] ? (
                  // If the appointment is already completed or a prescription exists, show "Meeting Completed"
                  (item.prescription && item.prescription.report) ? (
                    <span className="text-gray-600">Meeting Completed</span>
                  ) : joinedMeetings[item._id] ? (
                    <div>
                      <a
                        onClick={() =>
                          handleJoinMeetingClick(
                            item._id,
                            videoCallLinks[item._id]
                          )
                        }
                        href={videoCallLinks[item._id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Join Meeting
                      </a>
                      <div className="mt-1">
                        <input
                          type="checkbox"
                          id={`complete-${item._id}`}
                          onChange={async (e) => {
                            if (e.target.checked) {
                              await completeAppointment(item._id);
                              // Re-fetch appointments so that item.isCompleted updates
                            }
                          }}
                        />
                        <label htmlFor={`complete-${item._id}`} className="ml-1">
                          Mark as Completed
                        </label>
                      </div>
                    </div>
                  ) : (
                    <a
                      onClick={() =>
                        handleJoinMeetingClick(item._id, videoCallLinks[item._id])
                      }
                      href={videoCallLinks[item._id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Join Meeting
                    </a>
                  )
                ) : (
                  <button
                    onClick={() => handleSetVideoCallLink(item._id)}
                    className="text-blue-500 border border-blue-500 px-2 py-1 rounded"
                  >
                    Provide Link
                  </button>
                )}
              </>
            ) : (
              <div className="flex">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt="Complete"
                />
              </div>
            )}
            {/* Prescription Column: Show only if meeting is completed */}
            {!item.cancelled &&
              item.isCompleted &&
              (item.prescription && item.prescription.report ? (
                <button
                  className="text-green-500 border border-green-500 px-2 py-1 rounded cursor-pointer"
                  onClick={() =>
                    navigate("/doctor-view-prescription", {
                      state: { appointment: item },
                    })
                  }
                >
                  View
                </button>
              ) : (
                <button
                  className="text-red-500 border border-red-500 px-2 py-1 rounded cursor-pointer"
                  onClick={() =>
                    navigate("/doctor-prescription", {
                      state: { appointment: item },
                    })
                  }
                >
                  If Crucial
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
