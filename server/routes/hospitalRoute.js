import express from 'express';
import { loginHospital } from '../controllers/hospitalController.js';
import authHospital from '../middlewares/authHospital.js';

const router = express.Router();

// Login route
router.post('/login', loginHospital);

// Example protected route (e.g., for dashboard access)
router.get('/profile', authHospital, (req, res) => {
  res.json({ success: true, hospital: req.hospital });
});

export default router;