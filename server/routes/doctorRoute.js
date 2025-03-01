import express from 'express'

import { doctorList,loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorProfile, updateDoctorProfile, doctorDashboard,setVideoCallLink,submitRating,getReviews} from '../controllers/doctorController.js'

import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor) 
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
doctorRouter.post("/set-video-call", authDoctor, setVideoCallLink);
doctorRouter.post('/submit-rating', submitRating); // New route for submitting ratings
doctorRouter.get('/reviews/:docId', getReviews);
export default doctorRouter