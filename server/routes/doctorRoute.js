import express from 'express'

import { doctorList,loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorProfile, updateDoctorProfile, doctorDashboard,setVideoCallLink,submitRating,getReviews,getDoctorSlots,updateDoctorSlots,deleteDoctorSlots} from '../controllers/doctorController.js'

import authDoctor from '../middlewares/authDoctor.js'
import { getDoctorById } from '../controllers/doctorController.js';
const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor) 
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)
doctorRouter.post('/dashboard', authDoctor, doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
doctorRouter.post("/set-video-call", authDoctor, setVideoCallLink);
doctorRouter.post('/submit-rating', submitRating); // New route for submitting ratings
doctorRouter.get('/reviews/:docId', getReviews);
doctorRouter.post('/slots', authDoctor, getDoctorSlots); // Get doctor slots
doctorRouter.post('/update-slots', authDoctor, updateDoctorSlots); // Update doctor slots
doctorRouter.post('/delete-slots', authDoctor, deleteDoctorSlots); // Delete doctor slots
doctorRouter.get('/:docId', getDoctorById);


export default doctorRouter