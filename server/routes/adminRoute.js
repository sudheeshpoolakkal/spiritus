import express from 'express';
import { 
  addDoctor, 
  allDoctors, 
  loginAdmin, 
  appointmentsAdmin, 
  appointmentCancel, 
  adminDashboard,
  getAllFeedbacks,
  markFeedbackAsRead,
  deleteFeedback
} from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';

const adminRouter = express.Router();


adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailablity);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);
adminRouter.get('/dashboard', authAdmin, adminDashboard);
adminRouter.get('/feedbacks', authAdmin, getAllFeedbacks);
adminRouter.post('/mark-feedback-read', authAdmin, markFeedbackAsRead);
adminRouter.post('/delete-feedback', authAdmin, deleteFeedback);

export default adminRouter;