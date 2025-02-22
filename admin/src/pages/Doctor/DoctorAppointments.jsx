import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment, setVideoCallLink } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [videoCallLinks, setVideoCallLinks] = useState({});

  // Fetch appointments when the component mounts
  useEffect(() => {
    getAppointments();
  }, [dToken]);

  // Update videoCallLinks state when appointments change
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

  // Function to set a new video call link
  const handleSetVideoCallLink = async (appointmentId) => {
    const link = prompt('Enter video call link:');
    if (link) {
      await setVideoCallLink(appointmentId, link);
      setVideoCallLinks((prev) => ({ ...prev, [appointmentId]: link }));
    }
  };

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date and time</p>
          <p>Fees</p>
          <p>Action</p>
          <p>Meeting</p>
        </div>
        {appointments.slice().reverse().map((item, index) => (
          <div
            className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
            key={item._id}
          >
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-20 rounded-full' src={item.userData.image} alt='' /> 
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full'>{item.payment ? 'Online' : 'Cash'}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
            <p>{currency}{item.amount}</p>

            {/* Appointment Status */}
            {item.cancelled ? (
              <p className='text-red-500'>Cancelled</p>
            ) : item.isCompleted ? (
              <>
                <p className='text-green-600'>Completed</p>
                {videoCallLinks[item._id] ? (
                  <a
                    href={videoCallLinks[item._id]}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 underline'
                  >
                    Join Meeting
                  </a>
                ) : (
                  <button
                    onClick={() => handleSetVideoCallLink(item._id)}
                    className='text-blue-500 border border-blue-500 px-2 py-1 rounded'
                  >
                    Provide Link
                  </button>
                )}
              </>
            ) : (
              <div className='flex'>
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className='w-10 cursor-pointer'
                  src={assets.cancel_icon}
                  alt='Cancel'
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className='w-10 cursor-pointer'
                  src={assets.tick_icon}
                  alt='Complete'
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
