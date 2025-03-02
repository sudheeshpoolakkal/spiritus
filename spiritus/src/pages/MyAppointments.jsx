import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'  // <-- Import useNavigate

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()  // <-- Initialize navigate

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  // Modified: Fetch prescription details for completed and paid appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } })
      if (data.success) {
        const appointmentsWithPrescription = await Promise.all(
          data.appointments.map(async (appointment) => {
            // If appointment is completed and payment made, fetch prescription details
            if (appointment.isCompleted && appointment.payment) {
              try {
                const res = await axios.get(
                  `${backendUrl}/api/prescription/user/${appointment._id}`,
                  { headers: { token } }
                );
                if (res.data.success) {
                  appointment.prescription = res.data.prescription;
                }
              } catch (err) {
                console.warn(`No prescription available for appointment ${appointment._id}`);
              }
            }
            return appointment;
          })
        );
        setAppointments(appointmentsWithPrescription.reverse());
        console.log(appointmentsWithPrescription);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  // Handler to navigate to the dummy checkout form
  const handlePayOnline = (appointment) => {
    navigate('/checkout', { state: { appointment } });
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const isJoinButtonVisible = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split('_').map(Number);
    const [hours, minutes] = slotTime.split(':').map(Number);
    const appointmentTime = new Date(year, month - 1, day, hours, minutes);
    const currentTime = new Date();
    const timeDifference = (appointmentTime - currentTime) / (1000 * 60); // in minutes
    return timeDifference <= 15 && timeDifference >= -15;
  };

  const shouldShowScheduledMessage = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split('_').map(Number);
    const [hours, minutes] = slotTime.split(':').map(Number);
    const appointmentTime = new Date(year, month - 1, day, hours, minutes);
    const currentTime = new Date();
    const timeDifference = (appointmentTime - currentTime) / (1000 * 60); // in minutes
    return timeDifference > 15;
  };

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-sm mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => handlePayOnline(item)}
                  className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                  Appointment Cancelled
                </button>
              )}
              {item.isCompleted && (
                <button className='w-auto px-4 py-2 border border-green-500 rounded text-green-500'>
                  Completed
                </button>
              )}
              
              {item.videoCallLink && shouldShowScheduledMessage(item.slotDate, item.slotTime) && (
                <p className="w-auto text-green-500 text-sm">
                  Your meeting has been scheduled. The link will be visible 15 minutes before the appointment time.
                </p>
              )}

              {item.videoCallLink && isJoinButtonVisible(item.slotDate, item.slotTime) && (
                <a href={item.videoCallLink} target='_blank' rel='noopener noreferrer'>
                  <button className='sm:min-w-48 py-2 border rounded text-blue-500 bg-blue-100 hover:bg-blue-500 hover:text-white'>
                    Join Meeting
                  </button>
                </a>
              )}

              {/* Prescription View Button */}
              {item.isCompleted && item.payment && item.prescription && item.prescription.prescriptionFile ? (
                <button
                  onClick={() => navigate('/user-prescription', { state: { appointment: item } })}
                  className='text-sm text-blue-500 border border-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white transition-all duration-300'
                >
                  View Prescription
                </button>
              ) : (
                <p className='text-gray-400 text-xs'>Prescription Not Available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments;
