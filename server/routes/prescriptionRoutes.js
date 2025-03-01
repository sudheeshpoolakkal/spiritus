// routes/prescriptionRoutes.js
import express from 'express';
import { addPrescription, getPrescription } from '../controllers/prescriptionController.js';
import authDoctor from '../middlewares/authDoctor.js';
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

// Add prescription
router.post('/add', authDoctor, upload.single('prescriptionFile'), addPrescription);

// Get prescription by appointment ID
router.get('/admin/:appointmentId', authAdmin, getPrescription);

export default router;
