import express from 'express';
import { 
  loginHospital, 
  getHospitalProfile, 
  updateHospitalProfile,
  testHospitals,
  createTestHospital,
  getHospitalAppointments,
  listHospitals,
  addDoctorToHospital,
  getHospitalDoctors,
  getDashboardData,
} from '../controllers/hospitalController.js';
import authHospital from '../middlewares/authHospital.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

// Test routes (remove these in production)
router.get('/test', testHospitals);
router.post('/create-test', createTestHospital);

// Login route
router.post('/login', loginHospital);

// Profile routes
router.get('/profile', authHospital, getHospitalProfile);
router.put('/profile', authHospital, updateHospitalProfile);

// Dashboard route
router.get('/dashboard', authHospital, getDashboardData);

// Appointment
router.get('/appointments', authHospital, getHospitalAppointments);

// List hospitals
router.get('/list', listHospitals);

// Doctor management
router.post('/add-doctor', authHospital, upload.single('image'), addDoctorToHospital);
router.get('/doctors', authHospital, getHospitalDoctors);

export default router;