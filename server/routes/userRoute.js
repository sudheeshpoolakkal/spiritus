import express from 'express';
import {
  registerUser, loginUser, getProfile, updateProfile, uploadProfileImage,
  bookAppointment, listAppointment, cancelAppointment, getVideoCallLink,
  processPayment, rateDoctor, submitFeedback, submitHospitalRegistration,
  submitDoctorRegistration, submitQuestionnaire,
  getHospitalDetails,
  getHospitalDoctors,
} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/book-appointment', upload.single('audioMessage'), authUser, bookAppointment);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.put('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.get('/appointments', authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.get('/video-call/:appointmentId', getVideoCallLink);
userRouter.post('/process-payment', authUser, processPayment);
userRouter.post('/upload-profile-image', upload.single('image'), authUser, uploadProfileImage);
userRouter.post('/rate-doctor', authUser, rateDoctor);
userRouter.post('/submit-feedback', submitFeedback);
userRouter.post('/submit-hospital-registration', upload.fields([
  { name: 'hospitalLicense', maxCount: 1 },
  { name: 'hospitalLogo', maxCount: 1 },
]), submitHospitalRegistration);
userRouter.post('/submit-doctor-registration', upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'licenseCertificate', maxCount: 1 },
]), submitDoctorRegistration);
userRouter.post('/submit-questionnaire', authUser, submitQuestionnaire);

userRouter.get('/hospital/:hospitalId', getHospitalDetails);
userRouter.get('/hospital/:hospitalId/doctors', getHospitalDoctors);

export default userRouter;
