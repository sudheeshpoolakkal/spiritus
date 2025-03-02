import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()


  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  // Modified: Fetch prescription details for completed and paid appointments
  const getUserAppointments = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } })
      if (data.success) {

        setAppointments(data.appointments.reverse())

      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch appointments")
    } finally {
      setIsLoading(false)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {

      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message || "Failed to cancel appointment")
    }
  }

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

    const timeDifference = (appointmentTime - currentTime) / (1000 * 60);

    return timeDifference <= 15 && timeDifference >= -15;
  };

  const shouldShowScheduledMessage = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split('_').map(Number);
    const [hours, minutes] = slotTime.split(':').map(Number);

    const appointmentTime = new Date(year, month - 1, day, hours, minutes);
    const currentTime = new Date();
    const timeDifference = (appointmentTime - currentTime) / (1000 * 60);
    return timeDifference > 15;
  };

  const getAppointmentStatus = (appointment) => {
    if (appointment.cancelled) return 'cancelled';
    if (appointment.isCompleted) return 'completed';
    
    const [day, month, year] = appointment.slotDate.split('_').map(Number);
    const [hours, minutes] = appointment.slotTime.split(':').map(Number);
    const appointmentTime = new Date(year, month - 1, day, hours, minutes);
    const currentTime = new Date();
    
    if (appointmentTime < currentTime && !appointment.isCompleted) return 'missed';
    if (isJoinButtonVisible(appointment.slotDate, appointment.slotTime)) return 'active';
    return 'upcoming';
  };

  const filterAppointments = () => {
    return appointments.filter(appointment => {
      // Filter by status
      if (activeFilter !== 'all' && getAppointmentStatus(appointment) !== activeFilter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const searchTerms = searchQuery.toLowerCase();
        return (
          appointment.docData.name.toLowerCase().includes(searchTerms) ||
          appointment.docData.speciality.toLowerCase().includes(searchTerms) ||
          slotDateFormat(appointment.slotDate).toLowerCase().includes(searchTerms)
        );
      }
      
      return true;
    });
  };

  const filteredAppointments = filterAppointments();
  
  // Group appointments by date for better organization
  const groupAppointmentsByDate = () => {
    const grouped = {};
    
    filteredAppointments.forEach(appointment => {
      const formattedDate = slotDateFormat(appointment.slotDate);
      if (!grouped[formattedDate]) {
        grouped[formattedDate] = [];
      }
      grouped[formattedDate].push(appointment);
    });
    
    return grouped;

  };
  
  const groupedAppointments = groupAppointmentsByDate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
          <p className="text-gray-500 mt-1">Manage your upcoming and past consultations</p>
        </div>
        <button 
  onClick={() => navigate('/doctors')}
  className="inline-flex items-center px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition shadow-sm"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  Book New Appointment
</button>
      </div>

      {/* Search and filter bar */}
      {!isLoading && appointments.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by doctor, specialty or date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            
            <div className="flex items-center overflow-x-auto pb-1 whitespace-nowrap">
              {['all', 'active', 'upcoming', 'completed', 'cancelled', 'missed'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 mr-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter 
                      ? 'bg-green-100 text-green-800 border border-indigo-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}

            </div>
          </div>
        </div>
      )}
      
      {isLoading ? (
        <div className="bg-white rounded-lg shadow flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading your appointments...</p>
          </div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <div className="bg-indigo-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No appointments found</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">You haven't scheduled any appointments yet. Book your first consultation with a healthcare professional.</p>
          <button 
            onClick={() => navigate('/doctors')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
          >
            Find a Doctor
          </button>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">No appointments match your filters</p>
          <button
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedAppointments).map(([date, dateAppointments]) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center">
                <div className="h-px bg-gray-200 flex-grow mr-3"></div>
                <h3 className="text-sm font-medium text-gray-500 whitespace-nowrap">{date}</h3>
                <div className="h-px bg-gray-200 flex-grow ml-3"></div>
              </div>
              
              <div className="grid gap-4">
                {dateAppointments.map((item, index) => {
                  const status = getAppointmentStatus(item);
                  const statusStyles = {
                    active: 'bg-green-50 text-green-700 border-green-200',
                    upcoming: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                    completed: 'bg-blue-50 text-blue-700 border-blue-200',
                    cancelled: 'bg-red-50 text-red-700 border-red-200',
                    missed: 'bg-orange-50 text-orange-700 border-orange-200'
                  }[status];
                  
                  return (
                    <div 
                      key={index} 
                      className={`bg-white shadow rounded-xl overflow-hidden border-l-4 ${
                        status === 'active' ? 'border-l-blue-500' :
                        status === 'upcoming' ? 'border-l-indigo-500' :
                        status === 'completed' ? 'border-l-[#0D8845]' :
                        status === 'cancelled' ? 'border-l-red-500' :
                        'border-l-orange-500'
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                          <div className="flex flex-col sm:flex-row items-start gap-4">
                            {/* Doctor Image with Payment Status Overlay */}
                            <div className="relative flex-shrink-0">
                              <div className="relative">
                                <img 
                                  className="w-40 h-40 object-cover rounded-lg shadow-sm border border-gray-200" 
                                  src={item.docData.image} 
                                  alt={`${item.docData.name}`} 
                                />
                                <div className={`absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full font-medium shadow-sm 
                                  ${item.payment ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'}`}>
                                  {item.payment ? 'Paid' : 'Unpaid'}
                                </div>
                              </div>
                              
                              {/* Show status badge on the left only if it's not "completed" */}
                              {status !== 'completed' && (
                                <div className={`mt-2 px-3 py-1 text-xs font-medium rounded-md text-center uppercase ${statusStyles}`}>
                                  {status}
                                </div>
                              )}
                            </div>
                            
                            {/* Appointment Details */}
                            <div>
                              <h2 className="text-lg font-bold text-gray-800">{item.docData.name}</h2>
                              <p className="text-sm font-medium text-indigo-600 mb-2">{item.docData.speciality}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{item.slotTime}</span>
                                </div>
                                
                                <div className="flex items-center text-sm text-gray-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  <span>Online Consultation</span>
                                </div>
                                
                                <div className="flex items-start text-sm text-gray-600 md:col-span-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  <span>{item.docData.address.line1}, {item.docData.address.line2}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right side: Completed status (if applicable) and action buttons */}
                          <div className="flex flex-col lg:items-end gap-2 lg:w-40">
                            {/* Render completed badge on the right if status is completed */}
                            {status === 'completed' && (
                              <div className="px-3 py-1 text-xs rounded-md font-medium bg-blue-50 text-blue-700 border border-blue-200 mb-2">
                                Completed
                              </div>
                            )}
                            
                            {item.cancelled && (
                              <div className="px-3 py-1 text-xs rounded-md font-medium bg-red-100 text-red-800 border border-red-200 mb-2">
                                Cancelled
                              </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2 justify-end">
                              {!item.cancelled && !item.payment && !item.isCompleted && (
                                <button
                                  onClick={() => handlePayOnline(item)}
                                  className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                  </svg>
                                  Pay Now
                                </button>
                              )}
                              
                              {!item.cancelled && !item.isCompleted && (
                                <button 
                                  onClick={() => cancelAppointment(item._id)} 
                                  className="flex items-center justify-center px-4 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Cancel
                                </button>
                              )}
                              
                              {item.videoCallLink && isJoinButtonVisible(item.slotDate, item.slotTime) && (
                                <a 
                                  href={item.videoCallLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                  Join Meeting
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Meeting scheduled message */}
                        {item.videoCallLink && shouldShowScheduledMessage(item.slotDate, item.slotTime) && (
                          <div className="mt-4 px-4 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Join link will be available 15 minutes before your scheduled appointment time
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments;
