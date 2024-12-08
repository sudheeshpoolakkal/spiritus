import express from 'express';
import { addDoctor , loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';  // Ensure the correct path
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

// Test route to verify file upload
adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);

export default adminRouter;