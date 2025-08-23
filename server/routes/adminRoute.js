import express from 'express';
import {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
  getAllFeedbacks,
  markFeedbackAsRead,
  deleteFeedback,
  getAllHospitals,
  getAllDoctorRegistrations,
  markHospitalAsReviewed,
  markDoctorRegistrationAsReviewed,
  deleteHospital,
  deleteDoctorRegistration,
  addHospital,  // Add this to your import
  assignDoctorToHospital,
} from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/add-hospital', authAdmin, upload.fields([{ name: 'hospitalLogo' }, { name: 'hospitalLicense' }]), addHospital);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailablity);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);
adminRouter.get('/dashboard', authAdmin, adminDashboard);
adminRouter.get('/feedbacks', authAdmin, getAllFeedbacks);
adminRouter.post('/mark-feedback-read', authAdmin, markFeedbackAsRead);
adminRouter.post('/delete-feedback', authAdmin, deleteFeedback);
adminRouter.get('/hospitals', authAdmin, getAllHospitals);
adminRouter.get('/doctor-registrations', authAdmin, getAllDoctorRegistrations);
adminRouter.post('/mark-hospital-reviewed', authAdmin, markHospitalAsReviewed);
adminRouter.post('/mark-doctor-registration-reviewed', authAdmin, markDoctorRegistrationAsReviewed);
adminRouter.post('/delete-hospital', authAdmin, deleteHospital);
adminRouter.post('/delete-doctor-registration', authAdmin, deleteDoctorRegistration);
adminRouter.post('/hospitals/:hospitalId/assign-doctor', authAdmin, assignDoctorToHospital);

export default adminRouter;