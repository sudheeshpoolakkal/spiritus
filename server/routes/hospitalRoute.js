import express from 'express';
import { 
  loginHospital, 
  getHospitalProfile, 
  updateHospitalProfile,
  testHospitals,
  createTestHospital 
} from '../controllers/hospitalController.js';
import authHospital from '../middlewares/authHospital.js';

const router = express.Router();

// Test routes (remove these in production)
router.get('/test', testHospitals);
router.post('/create-test', createTestHospital);

// Login route
router.post('/login', loginHospital);

// Profile routes
router.get('/profile', authHospital, getHospitalProfile);
router.put('/profile', authHospital, updateHospitalProfile);

export default router;