import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, uploadProfileImage, bookAppointment, listAppointment, cancelAppointment, getVideoCallLink, processPayment, rateDoctor, submitFeedback } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/book-appointment', authUser, upload.single('audioMessage'), bookAppointment);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.get('/appointments', authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.get("/video-call/:appointmentId", getVideoCallLink);
userRouter.post('/process-payment', authUser, processPayment);
userRouter.post('/upload-profile-image', authUser, upload.single('image'), uploadProfileImage);
userRouter.post('/rate-doctor', authUser, rateDoctor);
userRouter.post('/submit-feedback', submitFeedback);

export default userRouter;
