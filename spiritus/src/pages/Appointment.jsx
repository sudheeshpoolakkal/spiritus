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
  // Rating and review state
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [doctorReviews, setDoctorReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDocInfo = () => {
    if (doctors && doctors.length > 0) {
      const foundDoc = doctors.find(doc => doc._id === docId);
      if (foundDoc) {
        setDocInfo(foundDoc);
        // If doctor has reviews, set them in state
        if (foundDoc.reviews && foundDoc.reviews.length > 0) {
          setDoctorReviews(foundDoc.reviews);
        } else {
          // Fetch reviews separately if not included with doctor data
          fetchDoctorReviews();
        }
      }
    }
  };

  // Fetch doctor reviews
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

  // Fetch completed appointments for this doctor
  const fetchCompletedAppointments = () => {
    if (appointments && docId) {
      const completed = appointments.filter(
        app => app.docId === docId &&
          app.isCompleted === true &&
          !app.cancelled &&
          !app.rating // Only include appointments that haven't been rated yet
      );
      setCompletedAppointments(completed);
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

        // Use the appointments array (from context) to check if a paid appointment exists for this slot.
        const slotIsPaid = appointments
          ? appointments.some(
            (app) =>
              app.docData._id === docInfo._id &&
              app.slotDate === slotDate &&
              app.slotTime === formattedTime &&
              app.payment === true
          )
          : false;

        // Only add the slot if there's no paid appointment.
        if (!slotIsPaid) {
          daySlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Only add the day if it has available slots
      if (daySlots.length > 0) {
        availableSlots.push(daySlots);
      }
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
      toast.warn('Login to book Appointment');
      return navigate('/login');
    }

    // Validate patient description if required
    if (!patientDescription.trim()) {
      toast.warn('Please describe your symptoms or reason for booking');
      return;
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

  // Handle rating change
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Handle review change
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  // Handle rating and review submission
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
      // Get user ID from token or context
      const userId = localStorage.getItem('userId'); // Adjust based on how you store user ID

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
        getDoctorsData(); // Refresh doctor data to update rating

        // Mark this appointment as rated in local state
        setCompletedAppointments(prev =>
          prev.filter(app => app._id !== appointmentId)
        );

        // Refresh doctor reviews
        fetchDoctorReviews();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Rating submission error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Format date for display
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
  }, [docInfo, appointments]); // re-run when appointments change

  useEffect(() => {
    if (appointments && docId) {
      fetchCompletedAppointments();
    }
  }, [appointments, docId]);

  if (!docInfo) {
    return <p>Loading doctor details...</p>;
  }

  return (
    <div className="mb-12">
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <div className='flex items-center justify-between'>
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {docInfo.name}
              <img className='w-5' src={assets.verified_icon} alt="" />
            </p>
            <div className='flex items-center'>
              <div className='flex items-center'>
                <span className='flex items-center text-yellow-400 mr-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill={star <= (docInfo.rating || 0) ? "currentColor" : "none"}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={star <= (docInfo.rating || 0) ? 0 : 1.5} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
                <span className='text-gray-700'>{docInfo.rating?.toFixed(1) || "0.0"}</span>
              </div>
              <span className='ml-2 text-sm text-gray-500'>({docInfo.ratingCount || 0} ratings)</span>
            </div>
          </div>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="info" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-2'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        {docSlots.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded-lg mt-4 text-center border">
            <p className="text-gray-600">No available appointment slots with this doctor.</p>
          </div>
        ) : (
          <>
            <div className='flex gap-3 items-center w-full overflow-x-auto mt-4'>
              {docSlots.map((item, index) => (
                <div
                  key={index}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
                  onClick={() => handleSlotIndexChange(index)}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
            </div>
            <div className='flex items-center gap-3 w-full overflow-x-auto mt-10'>
              {docSlots[slotIndex]?.map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-40 border border-gray-300'}`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
            </div>

            <textarea
              value={patientDescription}
              onChange={(e) => setPatientDescription(e.target.value)}
              placeholder="Describe your symptoms or the reason for booking..."
              className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-gray-700"
              rows="4"
              required
            />

            <button
              onClick={bookAppointment}
              disabled={!slotTime}
              className={`${!slotTime ? 'bg-gray-400' : 'bg-primary'} text-white text-sm font-light px-14 py-3 rounded-full my-6`}
            >
              Book an Appointment
            </button>
          </>
        )}
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

      {/* Reviews Section */}
      <div className="mt-12 mb-8">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Patient Reviews</h3>

        {loading ? (
          <p className="text-gray-600">Loading reviews...</p>
        ) : doctorReviews && doctorReviews.length > 0 ? (
          <div className="space-y-6">
            {doctorReviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="flex items-center text-yellow-400 mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill={star <= review.rating ? "currentColor" : "none"}
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={star <= review.rating ? 0 : 1.5} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </span>
                      <span className="font-medium text-gray-700">{review.rating}.0</span>
                    </div>
                    <p className="text-gray-800 mb-2">
                      {review.review || "Rated but no written review provided."}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {review.date && formatDate(review.date)}
                  </div>
                </div>
                {/* We could show the user name here, but we'd need to fetch user data */}
                <p className="text-xs text-gray-500">Verified Patient</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg border text-center">
            <p className="text-gray-600">No reviews yet for this doctor.</p>
          </div>
        )}
      </div>

      {/* Rating and Review Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Rate Your Experience</h3>

        {completedAppointments.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="mb-3 text-gray-700">You have completed appointments with this doctor. Share your experience:</p>

            {completedAppointments.map((appointment) => (
              <div key={appointment._id} className="mb-6 pb-6 border-b last:border-b-0 last:mb-0 last:pb-0">
                <p className="text-sm text-gray-500 mb-2">
                  Appointment on {new Date(appointment.date).toLocaleDateString()} at {appointment.slotTime}
                </p>

                <div className="flex flex-col gap-4 mt-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => handleRatingChange(star)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill={star <= (hoveredRating || rating) ? "currentColor" : "none"}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={star <= (hoveredRating || rating) ? 0 : 1.5}
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      </button>
                    ))}
                    <span className="ml-2 self-center text-gray-600">
                      {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select a rating'}
                    </span>
                  </div>

                  <textarea
                    value={review}
                    onChange={handleReviewChange}
                    placeholder="Write your review about your experience with the doctor (optional)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-gray-700"
                    rows="3"
                  />

                  <button
                    onClick={() => submitRatingAndReview(appointment._id)}
                    className="bg-primary text-white text-sm px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed self-start mt-2"
                    disabled={rating === 0}
                  >
                    Submit Rating & Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg border text-center">
            <p className="text-gray-600">
              {hasRated
                ? "Thank you for rating this doctor!"
                : "You can rate this doctor after completing an appointment."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;