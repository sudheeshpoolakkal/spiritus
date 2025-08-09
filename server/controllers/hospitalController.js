import Hospital from '../models/hospitalModel.js';
import jwt from 'jsonwebtoken';

export const loginHospital = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find hospital by email
    const hospital = await Hospital.findOne({ email });
    if (!hospital) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await hospital.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: hospital._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      success: true,
      token,
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};