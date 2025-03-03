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

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // joinedMeetings tracks appointments where the meeting link has been clicked
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

  // When a meeting link is clicked, mark the appointment as joined and open the link.
  const handleJoinMeetingClick = (appointmentId, link) => {
    setJoinedMeetings((prev) => ({ ...prev, [appointmentId]: true }));
    window.open(link, "_blank");
  };

  // When the "Mark as Completed" checkbox is checked, call the API.
  const handleMarkCompleted = async (appointmentId) => {
    await completeAppointment(appointmentId);
    // Assuming completeAppointment triggers a re-fetch of appointments.
  };

  return (

    <div className='w-full m-3 md:m-5'>
      {/* Mobile View Selection Tab */}
      <div className='md:hidden flex justify-between bg-white border rounded mb-2'>
        <button 
          className={`w-1/2 py-3 text-center ${!selectedAppointment ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
          onClick={() => setSelectedAppointment(null)}
        >
          Appointments
        </button>
        <button 
          className={`w-1/2 py-3 text-center ${selectedAppointment ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
          disabled={!selectedAppointment}
        >
          Details
        </button>
      </div>

      {/* Desktop and Mobile Layout Container */}
      <div className='flex flex-col md:flex-row gap-5'>
        {/* Appointments List - Hidden on mobile when appointment is selected */}
        <div className={`w-full md:w-5/12 ${selectedAppointment ? 'hidden md:block' : ''}`}>
          <p className='mb-3 text-lg font-medium'>All Appointments</p>
          <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
            <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_2fr_1fr] gap-1 py-3 px-6 border-b'>
              <p>#</p>
              <p>Patient</p>
              <p>Date</p>
              <p>Status</p>
            </div>
            
            {/* Mobile Appointment List Layout */}
            <div className='sm:hidden'>
              {appointments.slice().reverse().map((item, index) => (
                <div
                  className={`flex flex-col p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedAppointment?._id === item._id ? 'bg-blue-50' : ''}`}
                  key={item._id}
                  onClick={() => setSelectedAppointment(item)}
                >
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                      <img className='w-12 h-12 rounded-full object-cover' src={item.userData.image} alt='' />
                      <div>
                        <p className='font-medium'>{item.userData.name}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full
                      ${item.cancelled ? 'bg-red-100 text-red-500' : ''} 
                      ${!item.cancelled && item.isCompleted ? 'bg-green-100 text-green-600' : ''}
                      ${!item.cancelled && !item.isCompleted ? 'bg-blue-100 text-blue-500' : ''}
                    `}>
                      {item.cancelled ? 'Cancelled' : (item.isCompleted ? 'Completed' : 'Pending')}
                    </span>
                  </div>
                  
                  <div className='text-sm mt-1'>
                    <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop Appointment List Layout */}
            <div className='max-sm:hidden'>
              {appointments.slice().reverse().map((item, index) => (
                <div
                  className={`grid grid-cols-[0.5fr_2fr_2fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 cursor-pointer ${selectedAppointment?._id === item._id ? 'bg-blue-50' : ''}`}
                  key={item._id}
                  onClick={() => setSelectedAppointment(item)}
                >
                  <p>{index + 1}</p>
                  <div className='flex items-center gap-2'>
                    <img className='w-10 h-10 rounded-full object-cover' src={item.userData.image} alt='' />
                    <p className='truncate'>{item.userData.name}</p>
                  </div>
                  <p className='truncate'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                  <p className={`
                    ${item.cancelled ? 'text-red-500' : ''} 
                    ${!item.cancelled && item.isCompleted ? 'text-green-600' : ''}
                    ${!item.cancelled && !item.isCompleted ? 'text-blue-500' : ''}
                  `}>
                    {item.cancelled ? 'Cancelled' : (item.isCompleted ? 'Completed' : 'Pending')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Details Panel */}
        <div className={`w-full md:w-7/12 ${!selectedAppointment ? 'hidden md:block' : ''}`}>
          <div className="flex items-center justify-between mb-3">
            <p className='text-lg font-medium'>Appointment Details</p>
            {/* Back button for mobile */}
            {selectedAppointment && (
              <button 
                className="md:hidden flex items-center text-blue-600"
                onClick={() => setSelectedAppointment(null)}
              >
                <span className="material-icons-outlined">arrow_back</span>
                <span className="ml-1">Back</span>
              </button>
            )}

          </div>
          
          {selectedAppointment ? (
            <div className='bg-white border rounded p-4 md:p-6 max-h-[80vh] overflow-y-auto'>
              {/* Patient Details */}
              <div className='flex items-center space-x-4 border-b pb-4 mb-4'>
                <img 
                  src={selectedAppointment.userData.image} 
                  alt={selectedAppointment.userData.name} 
                  className='w-16 h-16 rounded-full object-cover'
                />
                <div>
                  <h3 className='text-lg font-medium'>{selectedAppointment.userData.name}</h3>
                  <p className='text-sm text-gray-500'>
                    Age: {calculateAge(selectedAppointment.userData.dob)} | 
                    Gender: {selectedAppointment.userData.gender || 'Not specified'}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Email: {selectedAppointment.userData.email}
                  </p>
                </div>
              </div>

              {/* Patient Description - Top priority on mobile, natural order on desktop */}
              {selectedAppointment.patientDescription && (
                <div className='mb-6 md:order-none order-first'>
                  <h4 className='text-md font-medium mb-2'>Patient Description</h4>
                  <div className='p-3 bg-gray-50 rounded border text-sm'>
                    {selectedAppointment.patientDescription}
                  </div>
                </div>
              )}
              
              <div className='mb-6'>
                <h4 className='text-md font-medium mb-2'>Appointment Information</h4>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <p className='text-gray-500'>Date:</p>
                  <p>{slotDateFormat(selectedAppointment.slotDate)}</p>
                  
                  <p className='text-gray-500'>Time:</p>
                  <p>{selectedAppointment.slotTime}</p>
                  
                  <p className='text-gray-500'>Payment:</p>
                  <p>{selectedAppointment.payment ? 'Paid (Online)' : 'Cash Payment'}</p>
                  
                  <p className='text-gray-500'>Fee:</p>
                  <p>{currency}{selectedAppointment.amount}</p>
                  
                  <p className='text-gray-500'>Status:</p>
                  <p className={`
                    ${selectedAppointment.cancelled ? 'text-red-500' : ''} 
                    ${!selectedAppointment.cancelled && selectedAppointment.isCompleted ? 'text-green-600' : ''}
                    ${!selectedAppointment.cancelled && !selectedAppointment.isCompleted ? 'text-blue-500' : ''}
                  `}>
                    {selectedAppointment.cancelled ? 'Cancelled' : (selectedAppointment.isCompleted ? 'Completed' : 'Pending')}
                  </p>
                </div>
              </div>

              {/* Actions Section */}
              {!selectedAppointment.cancelled && (
                <div className='flex flex-col sm:flex-row flex-wrap gap-3 mt-6'>
                  {!selectedAppointment.isCompleted ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelAppointment(selectedAppointment._id);
                        }}
                        className='flex items-center justify-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50'
                      >
                        <img className='w-5' src={assets.cancel_icon} alt='Cancel' />
                        Cancel Appointment
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          completeAppointment(selectedAppointment._id);
                        }}
                        className='flex items-center justify-center gap-2 px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-50'
                      >
                        <img className='w-5' src={assets.tick_icon} alt='Complete' />
                        Mark as Completed
                      </button>
                    </>
                  ) : (
                    <div className='w-full'>
                      {videoCallLinks[selectedAppointment._id] ? (
                        <div className='flex flex-col gap-2'>
                          <div className='flex flex-col sm:flex-row sm:items-center gap-2 text-gray-700 mb-2'>
                            <span className='text-sm font-medium'>Video Call Link:</span>
                            <a
                              href={videoCallLinks[selectedAppointment._id]}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-blue-500 underline text-sm break-all'
                              onClick={(e) => {
                                e.preventDefault();
                                handleJoinMeetingClick(
                                  selectedAppointment._id,
                                  videoCallLinks[selectedAppointment._id]
                                );
                              }}
                            >
                              {videoCallLinks[selectedAppointment._id]}
                            </a>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetVideoCallLink(selectedAppointment._id);
                            }}
                            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                          >
                            Change Video Call Link
                          </button>
                          
                          {/* Display completion checkbox if meeting joined but not marked as complete */}
                          {joinedMeetings[selectedAppointment._id] && 
                           (!selectedAppointment.prescription || !selectedAppointment.prescription.report) && (
                            <div className='mt-3 flex items-center'>
                              <input
                                type='checkbox'
                                id={`complete-${selectedAppointment._id}`}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    handleMarkCompleted(selectedAppointment._id);
                                  }
                                }}
                                className='mr-2'
                              />
                              <label htmlFor={`complete-${selectedAppointment._id}`}>
                                Mark as Completed
                              </label>
                            </div>
                          )}
                          
                          {/* Prescription button based on state - UPDATED */}
                          {selectedAppointment.prescription && selectedAppointment.prescription.report ? (
                            <button
                              className='mt-3 px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50'
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/doctor-view-prescription', { state: { appointment: selectedAppointment } });
                              }}
                            >
                              Show Prescription
                            </button>
                          ) : (
                            <button
                              className='mt-3 px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50'
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/doctor-prescription', { state: { appointment: selectedAppointment } });
                              }}
                            >
                              {joinedMeetings[selectedAppointment._id] ? 'Add Prescription' : 'Add Prescription (If Crucial)'}
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetVideoCallLink(selectedAppointment._id);
                          }}
                          className='w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                        >
                          Provide Video Call Link
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className='bg-white border rounded p-6 flex items-center justify-center min-h-[50vh] text-gray-400'>
              Select an appointment to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;