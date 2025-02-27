// routes/prescriptionRoutes.js
import express from 'express';
import { addPrescription, getPrescription } from '../controllers/prescriptionController.js';
import authDoctor from '../middlewares/authDoctor.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

// Add prescription
router.post('/add', authDoctor, upload.single('prescriptionFile'), addPrescription);

// Get prescription by appointment ID
router.get('/:appointmentId', authDoctor, getPrescription);

export default router;
