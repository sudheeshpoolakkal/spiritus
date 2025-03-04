import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";
import { useNavigate } from "react-router-dom";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <p className="mb-3 text-xl font-semibold text-gray-700">All Appointments</p>

      {/* 
        This container uses both a min and max height.
        It extends down until 60% of the viewport, 
        then scrolls if it goes beyond 80% of the viewport.
      */}
      <div className="bg-white border rounded-lg shadow-sm text-sm 
                      min-h-[60vh] max-h-[80vh] overflow-auto">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr_1fr] 
                        py-3 px-6 border-b bg-gray-100 font-medium text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
          <p>Prescription</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => (
          <div
            key={item._id} // unique key
            className="flex flex-wrap justify-between items-center 
                       sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr_1fr] 
                       text-gray-600 py-3 px-6 border-b hover:bg-gray-50 transition"
          >
            {/* Index */}
            <p className="hidden sm:block">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={item.userData.image}
                alt="Patient"
              />
              <p className="truncate">{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className="hidden sm:block">{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p className="text-xs sm:text-sm">
              {slotDateFormat(item.slotDate)}, {item.slotTime || "N/A"}
            </p>

            {/* Doctor */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full bg-gray-200 object-cover"
                src={item.docData.image}
                alt="Doctor"
              />
              <p className="truncate">{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p className="text-xs sm:text-sm font-medium">
              {currency}
              {item.amount}
            </p>

            {/* Status/Actions */}
            {item.cancelled ? (
              <p className="text-red-500 text-xs font-semibold">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-semibold">Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-6 h-6 cursor-pointer hover:opacity-75"
                src={assets.cancel_icon}
                alt="Cancel"
              />
            )}

            {/* Prescription */}
            {item.isCompleted && item.prescription?.prescriptionFile ? (
              <button
                onClick={() =>
                  navigate("/admin-prescription", {
                    state: { appointment: item },
                  })
                }
                className="bg-blue-500 text-white px-3 py-1 rounded text-xs 
                           hover:bg-blue-600 transition"
              >
                View
              </button>
            ) : (
              <p className="text-gray-400 text-xs">Not Available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
