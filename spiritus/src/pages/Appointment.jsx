import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import RelatedDoctors from '@/components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData, appointments } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [patientDescription, setPatientDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [doctorReviews, setDoctorReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('booking'); // 'booking', 'reviews', 'rate'

  const fetchDocInfo = () => {
    if (doctors?.length > 0 && docId) {
      const foundDoc = doctors.find(doc => doc._id === docId);
      if (foundDoc) {
        setDocInfo(foundDoc);
        if (foundDoc.reviews?.length > 0) {
          setDoctorReviews(foundDoc.reviews);
        } else {
          fetchDoctorReviews();
        }
      }
    }
  };

  const fetchDoctorReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/doctor/reviews/${docId}`);
      if (data.success) {
        setDoctorReviews(data.reviews);
      }
    } catch (error) {
      console.error("Error fetching doctor reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompletedAppointments = () => {
    if (appointments && docId) {
      const completed = appointments.filter(

        app => app.docId === docId && app.isCompleted && !app.cancelled && !app.rating

      );
      setCompletedAppointments(completed);
      if (completed.length > 0) {
        setActiveTab('rate');
      }
    }
  };

  const getAvailableSlot = () => {
    if (!docInfo) return;

    const availableSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let daySlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const slotIsPaid = appointments
          ? appointments.some(

              app =>
                app.docData._id === docInfo._id &&
                app.slotDate === slotDate &&
                app.slotTime === formattedTime &&
                app.payment === true
            )

          : false;

        if (!slotIsPaid) {
          daySlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      availableSlots.push(daySlots);

    }
    
    setDocSlots(availableSlots);
    
    // Reset slot selection if needed
    if (availableSlots.length === 0) {
      setSlotTime('');
    } else if (slotIndex >= availableSlots.length) {
      setSlotIndex(0);
      setSlotTime('');
    } else if (docSlots[slotIndex]?.length === 0 || !docSlots[slotIndex]) {
      setSlotTime('');
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book an appointment');
      return navigate('/login');
    }

    try {
      if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
        toast.error('No available slots for selected date');
        return;
      }
      
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime, patientDescription },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        // Update the local appointments to reflect the new booking
        await getDoctorsData();
        // Refresh available slots to immediately reflect the booking
        getAvailableSlot();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const submitRatingAndReview = async (appointmentId) => {
    if (!token) {
      toast.warn('Login to rate a doctor');
      return navigate('/login');
    }
    if (rating === 0) {
      toast.warn('Please select a rating between 1 and 5 stars');
      return;
    }
    try {

      const userId = localStorage.getItem('userId');

      const { data } = await axios.post(
        `${backendUrl}/api/user/rate-doctor`,
        { appointmentId, rating, review, docId, userId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success('Rating and review submitted successfully');
        setHasRated(true);
        setRating(0);
        setReview('');

        getDoctorsData();
        setCompletedAppointments(prev => prev.filter(app => app._id !== appointmentId));

        fetchDoctorReviews();
        setActiveTab('reviews');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Rating submission error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle slot date selection
  const handleSlotIndexChange = (index) => {
    setSlotIndex(index);
    setSlotTime(''); // Reset time selection when date changes
  };

  useEffect(() => {
    if (doctors && docId) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlot();
    }
  }, [docInfo, appointments]);

  useEffect(() => {
    if (appointments && docId) {
      fetchCompletedAppointments();
    }
  }, [appointments, docId]);

  if (!docInfo) {

    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>

        </div>
      </div>
    );
  }


  // Star rating component
  const StarRating = ({ rating, size = "sm", interactive = false, onChange, hoverValue = 0, onHover }) => {
    const sizes = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8"
    };
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`focus:outline-none ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => interactive && onChange && onChange(star)}
            onMouseEnter={() => interactive && onHover && onHover(star)}
            onMouseLeave={() => interactive && onHover && onHover(0)}
            disabled={!interactive}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${sizes[size]} text-yellow-400`}
              viewBox="0 0 20 20"
              fill={star <= (interactive ? (hoverValue || rating) : rating) ? "currentColor" : "none"}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={star <= (interactive ? (hoverValue || rating) : rating) ? 0 : 1.5}
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  // Tab navigation for the appointment page
  const TabNav = () => (
    <div className="flex border-b overflow-x-auto hide-scrollbar mb-6">
      <button
        onClick={() => setActiveTab('booking')}
        className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
          activeTab === 'booking'
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Book Appointment
      </button>
      <button
        onClick={() => setActiveTab('reviews')}
        className={`px-4 py-3 font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
          activeTab === 'reviews'
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Patient Reviews
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
          {doctorReviews.length}
        </span>
      </button>
      {completedAppointments.length > 0 && (
        <button
          onClick={() => setActiveTab('rate')}
          className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
            activeTab === 'rate'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Rate Doctor
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 bg-white">
      {/* Doctor Profile Card - Redesigned without banner */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6 mb-8 px-4 sm:px-6 pt-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center mb-6">
          <div className="flex-shrink-0 relative">
            {/* Increased image size */}
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="h-40 w-40 sm:h-56 sm:w-56 rounded-xl shadow-sm object-cover"
            />
            {/* Cleaner verification mark */}
            <img 
              src={assets.verified_icon} 
              alt="Verified" 
              className="absolute bottom-2 right-2 h-6 w-6"
            />
          </div>
          <div className="mt-6 sm:mt-0 sm:ml-8 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{docInfo.name}</h1>
                <p className="text-sm text-gray-600 mt-1">{docInfo.degree} - {docInfo.speciality}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center">
                    <StarRating rating={docInfo.rating || 0} />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {docInfo.rating?.toFixed(1) || "0.0"}
                    </span>

                  </div>
                  <span className="text-xs text-gray-500">({docInfo.ratingCount || 0} ratings)</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                    {docInfo.experience}
                  </span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="flex items-center justify-end">
                  <div className="px-4 py-2 bg-blue-50 rounded-lg text-center">
                    <p className="text-xs text-gray-500">Consultation Fee</p>
                    <p className="text-lg font-semibold text-gray-800">{currencySymbol}{docInfo.fees}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium flex items-center gap-1 text-gray-700">
                About Doctor <img src={assets.info_icon} alt="info" className="w-3 h-3" />
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {docInfo.about}
              </p>
            </div>
          </div>
        </div>
      </div>

      
      {/* Tab Navigation */}
      <TabNav />
      
      {/* Booking Content */}
      {activeTab === 'booking' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Appointment Date</h2>
            <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {docSlots.length > 0 &&
                docSlots.map((item, index) => {
                  if (!item[0]) return null;
                  const date = item[0].datetime;
                  const day = daysOfWeek[date.getDay()];
                  const dateNum = date.getDate();
                  const month = date.toLocaleString('default', { month: 'short' });
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSlotIndex(index)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                        slotIndex === index 
                          ? 'bg-primary text-white shadow-md ring-2 ring-primary ring-opacity-50' 
                          : 'bg-white border border-gray-200 hover:border-primary hover:text-primary'
                      }`}
                    >
                      <span className="text-xs font-medium">{day}</span>
                      <span className="text-lg font-bold">{dateNum}</span>
                      <span className="text-xs">{month}</span>
                    </button>
                  );
                })}
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Time Slot</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {docSlots.length > 0 &&
                docSlots[slotIndex].map((item, index) => (

                  <button
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`px-3 py-2 rounded-lg text-center text-sm transition-all ${
                      item.time === slotTime
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </button>
                ))}
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Appointment Details</h2>
            <textarea
              value={patientDescription}
              onChange={(e) => setPatientDescription(e.target.value)}
              placeholder="Describe your symptoms or reason for booking this appointment..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-gray-700"
              rows="4"
            />
            
            <div className="mt-6">
              <button
                onClick={bookAppointment}
                disabled={!slotTime}
                className={`
                  w-full sm:w-auto px-8 py-3 rounded-lg font-medium transition-all
                  ${!slotTime 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-primary text-white shadow-md hover:shadow-lg hover:bg-opacity-90'
                  }
                `}
              >
                Book Appointment
              </button>
              {!slotTime && (
                <p className="mt-2 text-sm text-gray-500">Please select a time slot to continue</p>
              )}
            </div>
          </div>

        </div>
      )}
      
      {/* Reviews Content */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Patient Reviews</h2>
            <div className="flex items-center">
              <StarRating rating={docInfo.rating || 0} />
              <span className="ml-2 text-sm font-medium">
                {docInfo.rating?.toFixed(1) || "0.0"}
                <span className="text-gray-500 ml-1">({docInfo.ratingCount || 0})</span>
              </span>
            </div>

          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : doctorReviews && doctorReviews.length > 0 ? (
            <div className="space-y-6">
              {doctorReviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        <StarRating rating={review.rating} />
                        <span className="ml-2 text-sm font-medium">{review.rating}.0</span>
                      </div>
                      <p className="text-gray-700">
                        {review.review || "Rated but no written review provided."}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {review.date && formatDate(review.date)}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">Verified Patient</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center border border-gray-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p className="mt-4 text-gray-600">No reviews yet for this doctor.</p>
              <p className="mt-2 text-sm text-gray-500">Be the first to share your experience after your appointment!</p>
            </div>
          )}
        </div>
      )}
      
      {/* Rate Doctor Content */}
      {activeTab === 'rate' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Rate Your Experience</h2>
          
          {completedAppointments.length > 0 ? (
            <div>
              <p className="text-gray-600 mb-6">Share your experience to help other patients:</p>
              {completedAppointments.map((appointment) => (
                <div key={appointment._id} className="border border-gray-200 p-6 rounded-lg">
                  <div className="mb-4">
                    <p className="font-medium text-gray-700">Your appointment on {new Date(appointment.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">Time: {appointment.slotTime}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <div className="flex items-center">
                        <StarRating 
                          rating={rating} 
                          size="xl" 
                          interactive={true} 
                          onChange={handleRatingChange} 
                          hoverValue={hoveredRating} 
                          onHover={setHoveredRating} 
                        />
                        <span className="ml-3 text-gray-600">
                          {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select rating'}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Review (Optional)</label>
                      <textarea
                        value={review}
                        onChange={handleReviewChange}
                        placeholder="Share your experience with this doctor..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-gray-700"
                        rows="4"
                      />
                    </div>
                    
                    <button
                      onClick={() => submitRatingAndReview(appointment._id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        rating === 0 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-primary text-white shadow hover:shadow-md'
                      }`}
                      disabled={rating === 0}
                    >
                      Submit Rating & Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-gray-100 p-8 rounded-lg text-center">
              {hasRated ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-4 text-gray-700">Thank you for rating this doctor!</p>
                  <p className="mt-2 text-sm text-gray-500">Your feedback helps other patients make informed decisions.</p>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-4 text-gray-600">You can rate this doctor after completing an appointment.</p>
                </>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Related Doctors Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Other Specialists You May Like</h2>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  );
};

export default Appointment;