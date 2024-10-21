import express from 'express';
import { addDoctor } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';  // Ensure the correct path

const adminRouter = express.Router();

adminRouter.post('/add-doctor', upload.single('image'), addDoctor);

export default adminRouter;
