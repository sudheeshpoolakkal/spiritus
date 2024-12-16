import express from 'express';
import { addDoctor , allDoctors, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';  // Ensure the correct path
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';

const adminRouter = express.Router();

// Test route to verify file upload
adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors',authAdmin, allDoctors);
adminRouter.post('/change-availability',authAdmin, changeAvailablity);

export default adminRouter;