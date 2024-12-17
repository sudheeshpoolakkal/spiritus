import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
    const { docId } = useParams();  // Get doctor ID from URL params
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);  // Fetch doctors and currency symbol from context
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const navigate = useNavigate()

    const [docInfo, setDocInfo] = useState(null);  // State to store selected doctor information
    const [docSlots, setDocSlots] = useState([]);  // State to store available slots
    const [slotIndex, setSlotIndex] = useState(0); // Currently selected day
    const [slotTime, setSlotTime] = useState('');  // Currently selected time slot
    const [patientDescription, setPatientDescription] = useState(''); // State for patient description

    // Fetch doctor information based on docId
    const fetchDocInfo = async () => {
        if (doctors && doctors.length > 0) {
            const foundDocInfo = doctors.find(doc => doc._id === docId);
            if (foundDocInfo) {
                setDocInfo(foundDocInfo);
                console.log("Doctor Info:", foundDocInfo);  // Debugging info
            } else {
                console.error("Doctor not found");
            }
        }
    };

    // Generate available time slots for the next 7 days
    const getAvailableSlot = () => {
        if (!docInfo) return;

        setDocSlots([]);  // Clear previous slots
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                });

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]));
        }
    };


    const bookAppointment = async ()=>{

        if (!token){
            toast.warn('Login to book Appointment')
            return navigate('/login')
        }

        try{

            const date = docSlots[slotIndex][0].datetime

            let day = date.getDate()
            let month = date.getMonth()+1
            let year = date.getFullYear()

            const slotDate = day + "_" + month + "_" + year

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {docId, slotDate, slotTime}, {headers:{token}})

            if (data.success){
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointments')
            }
            else{
                toast.error(data.message)
            }

        }
        catch(error){

            console.log(error);
            toast.error(error.message)

        }
    }

    // Fetch doctor info when `doctors` or `docId` changes
    useEffect(() => {
        if (doctors && docId) {
            fetchDocInfo();
        }
    }, [doctors, docId]);

    // Generate slots when `docInfo` is available
    useEffect(() => {
        if (docInfo) {
            getAvailableSlot();
        }
    }, [docInfo]);

    // Debugging log to check slots
    useEffect(() => {
        console.log("Available Slots:", docSlots);
    }, [docSlots]);

    // Render nothing if `docInfo` is not yet loaded
    if (!docInfo) {
        return <p>Loading doctor details...</p>;
    }

    return (
        <div>
            {/*-----------------doc details------------------*/}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
                </div>
                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} 
                    <img className='w-5' src={assets.verified_icon} alt=""/></p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>

                    {/* ____doctor about______*/}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="info"/></p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-2'>{docInfo.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4'>
                        Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
                    </p>
                </div>
            </div>

            {/*-----booking SLOTS------*/}
            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking Slots</p>
                <div className='flex gap-3 items-center w-full overflow overflow-x-auto mt-4'>
                    {
                        docSlots.length > 0 && docSlots.map((item, index) => (
                            <div className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} 
                                key={index}
                                onClick={() => setSlotIndex(index)}>
                               <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                               <p>{item[0] && item[0].datetime.getDate()}</p> 
                            </div>    
                        ))
                    }
                </div>
                <div className='flex items-center gap-3 w-full overflow-x-auto mt-10'>
                    {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                        <p 
                            onClick={() => setSlotTime(item.time)} 
                            className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-40 border border-gray-300'}`}
                            key={index}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                {/* Patient Description Textarea with Tailwind CSS */}
                <textarea
                    value={patientDescription}
                    onChange={(e) => setPatientDescription(e.target.value)}
                    placeholder="Describe your symptoms or the reason for booking..."
                    className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-gray-700"
                    rows="4"
                />

                <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>
                    Book an Appointment
                </button>
            </div>
        </div>
    );
};

export default Appointment;
