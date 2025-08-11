import Hospital from '../models/hospitalModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Test route to check hospitals in database
export const testHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find({}).select('email emailAddress hospitalName isReviewed');
    res.json({
      success: true,
      count: hospitals.length,
      hospitals: hospitals
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a test hospital
export const createTestHospital = async (req, res) => {
  try {
    const testHospital = new Hospital({
      hospitalName: "Test Hospital",
      name: "Test Hospital",
      type: "clinic",
      yearEstablished: 2020,
      email: "test@hospital.com",
      emailAddress: "test@hospital.com",
      password: "password123", // This will be hashed by the pre-save hook
      address: "123 Test Street",
      country: "India",
      state: "Test State",
      district: "Test District",
      pinCode: "123456",
      contactNumber: "9876543210",
      website: "https://test-hospital.com",
      keyContact: "Test Contact",
      mentalHealthProfessionals: 5,
      specializations: ["General", "Mental Health"],
      currentFees: "500-1000",
      teletherapy: "yes",
      operatingHours: "9 AM - 5 PM",
      emergencySupport: "yes",
      averagePatientLoad: 100,
      insuranceTies: "Test Insurance",
      accreditations: "Test Accreditation",
      hospitalLicense: "/test-license.jpg",
      hospitalLogo: "/test-logo.jpg",
      acknowledgement: true,
      isReviewed: true
    });

    await testHospital.save();
    res.json({
      success: true,
      message: "Test hospital created successfully",
      hospital: {
        email: testHospital.email,
        hospitalName: testHospital.hospitalName
      }
    });
  } catch (error) {
    console.error('Create test hospital error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginHospital = async (req, res) => {
  try {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Request body:', req.body);
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    console.log('Searching for hospital with email:', email.toLowerCase());

    // Find hospital by email OR emailAddress
    const hospital = await Hospital.findOne({
      $or: [
        { email: email.toLowerCase() },
        { emailAddress: email.toLowerCase() }
      ]
    });
    
    console.log('Hospital found:', !!hospital);
    if (hospital) {
      console.log('Hospital details:', {
        id: hospital._id,
        hospitalName: hospital.hospitalName,
        email: hospital.email,
        emailAddress: hospital.emailAddress,
        isReviewed: hospital.isReviewed
      });
    }
    
    if (!hospital) {
      return res.status(400).json({ 
        success: false, 
        message: 'No hospital found with this email address' 
      });
    }

    // Check if hospital is reviewed
    if (!hospital.isReviewed) {
      return res.status(400).json({ 
        success: false, 
        message: 'Hospital registration is under review. Please wait for approval.' 
      });
    }

    // Check password
    console.log('Comparing password...');
    const isMatch = await hospital.comparePassword(password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid password' 
      });
    }

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = jwt.sign(
      { 
        id: hospital._id,
        email: hospital.email,
        hospitalName: hospital.hospitalName 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    console.log('Login successful!');

    res.status(200).json({
      success: true,
      token,
      message: 'Login successful',
      hospital: {
        id: hospital._id,
        hospitalName: hospital.hospitalName,
        email: hospital.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error: ' + error.message 
    });
  }
};

export const getHospitalProfile = async (req, res) => {
  try {
    res.json({ success: true, hospital: req.hospital });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateHospitalProfile = async (req, res) => {
  try {
    const hospitalId = req.hospital._id;
    const updateData = req.body;

    const allowedFields = [
      'address', 'contactNumber', 'website', 'keyContact', 
      'mentalHealthProfessionals', 'specializations', 'currentFees', 
      'teletherapy', 'operatingHours', 'emergencySupport', 
      'averagePatientLoad', 'insuranceTies', 'accreditations'
    ];

    const filteredUpdate = {};
    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        filteredUpdate[field] = updateData[field];
      }
    });

    if (typeof filteredUpdate.specializations === 'string') {
      filteredUpdate.specializations = filteredUpdate.specializations.split(',').map(s => s.trim());
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalId,
      { $set: filteredUpdate },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedHospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      hospital: updatedHospital
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getHospitalAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({}); 
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const listHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find({ isReviewed: true }).select('-password');
    res.json({ success: true, hospitals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
