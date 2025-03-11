import express from 'express';
import { addPrescription, getPrescription } from '../controllers/prescriptionController.js';
import authDoctor from '../middlewares/authDoctor.js';
import authAdmin from '../middlewares/authAdmin.js';
import authUser from '../middlewares/authUser.js'; 
import upload from '../middlewares/multer.js';

const router = express.Router();

// Add prescription (only doctors can add)
router.post('/add', authDoctor, upload.single('prescriptionFile'), addPrescription);

// Get prescription by appointment ID for admin
router.get('/admin/:appointmentId', authAdmin, getPrescription);

// Get prescription by appointment ID for user
router.get('/user/:appointmentId', authUser, getPrescription);

// New route for doctor
router.get('/doctor/:appointmentId', authDoctor, getPrescription);

export default router;
