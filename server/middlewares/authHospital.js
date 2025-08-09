import jwt from 'jsonwebtoken';
import Hospital from '../models/hospitalModel.js';

const authHospital = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hospital = await Hospital.findById(decoded.id).select('-password');

    if (!hospital) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    req.hospital = hospital;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

export default authHospital;