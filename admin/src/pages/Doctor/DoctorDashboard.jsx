import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

// SVG Icons (Matching AdminDashboard)
const EarningsIcon = () => (
  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AppointmentIcon = () => (
  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
  </svg>
);

const PatientIcon = () => (
  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const SlotsIcon = () => (
  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Consultation Mode Icons
const OnlineIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const OfflineIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, doctorSlots, getDoctorSlots } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
      getDoctorSlots();
    }
  }, [dToken]);

  // Calculate total slots count
  const totalSlots = Object.values(doctorSlots).reduce((total, slots) => total + slots.length, 0);

  // Helper function to check if appointment is offline
  const isOfflineAppointment = (appointment) => {
    return appointment.consultationMode === 'offline' || 
           appointment.bookingType === 'offline' || 
           appointment.consultationType === 'offline' || 
           appointment.isOffline === true;
  };

  // Helper function to get consultation mode display
  const getConsultationMode = (appointment) => {
    if (isOfflineAppointment(appointment)) {
      return {
        type: 'offline',
        label: 'Offline',
        icon: OfflineIcon,
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700'
      };
    }
    return {
      type: 'online',
      label: 'Online',
      icon: OnlineIcon,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700'
    };
  };

  return (
    dashData && (
      <div className="p-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Earnings Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <EarningsIcon />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{currency}{dashData.earnings}</p>
                <p className="text-sm text-gray-500">Earnings</p>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <AppointmentIcon />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
                <p className="text-sm text-gray-500">Appointments</p>
              </div>
            </div>
          </div>

          {/* Patients Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <PatientIcon />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{dashData.patients}</p>
                <p className="text-sm text-gray-500">Patients</p>
              </div>
            </div>
          </div>

          {/* Available Slots Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <SlotsIcon />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{totalSlots}</p>
                <p className="text-sm text-gray-500">Available Slots</p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800">Latest Bookings</h3>
            </div>
          </div>

          <div className="divide-y">
            {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => {
                const consultationMode = getConsultationMode(item);
                return (
                  <div className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors" key={index}>
                    <img 
                      className="w-10 h-10 rounded-full object-cover" 
                      src={item.userData.image} 
                      alt={item.userData.name} 
                    />
                    <div className="ml-4 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.userData.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}</p>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{item.slotTime}</span>
                      </div>
                    </div>
                    
                    {/* Consultation Mode Badge */}
                    <div className="ml-4 flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${consultationMode.bgColor} ${consultationMode.textColor}`}>
                        <consultationMode.icon />
                        {consultationMode.label}
                      </span>
                      
                      {/* Status Badge */}
                      {item.cancelled ? (
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                          Cancelled
                        </span>
                      ) : item.isCompleted ? (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          Completed
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
                </svg>
                <p>No appointments yet</p>
                <p className="text-sm">Your upcoming appointments will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;