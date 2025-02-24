import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, getVideoCallLink, processPayment  } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.get("/video-call/:appointmentId", getVideoCallLink);
//userRouter.post('/payment', authUser, paymentStripe)
//userRouter.post('/create-checkout-session', createCheckoutSession);
userRouter.post('/process-payment', authUser, processPayment);
export default userRouter