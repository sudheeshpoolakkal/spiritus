import Hospital from '../models/hospitalModel.js';
import Doctor from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';

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
      hospitalLicense: "https://res.cloudinary.com/demo/image/upload/v1234567890/test-license.jpg", // Use a valid Cloudinary URL or placeholder
      hospitalLogo: "https://res.cloudinary.com/demo/image/upload/v1234567890/test-logo.jpg", // Use a valid Cloudinary URL or placeholder
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
    const hospitalId = req.hospital._id;
    const hospital = await Hospital.findById(hospitalId).populate('doctors');
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    const doctorIds = hospital.doctors.map(doc => doc._id);
    const appointments = await appointmentModel.find({ docId: { $in: doctorIds } }).populate('userData').populate('docData');
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

export const addDoctorToHospital = async (req, res) => {
  try {
    const hospitalId = req.hospital._id;
    const { name, email, password, speciality, experience, about, fees, address, degree } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    // Convert buffer to data URI
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'doctors',
      public_id: `${name.replace(/\s+/g, '_')}_${Date.now()}`
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      speciality,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      degree,
      image: result.secure_url, // Use the Cloudinary URL
      hospitalId,
      date: new Date().getTime(),
    });

    await newDoctor.save();

    hospital.doctors.push(newDoctor._id);
    await hospital.save();

    res.json({ success: true, message: 'Doctor added successfully', doctor: newDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHospitalDoctors = async (req, res) => {
  try {
    const hospitalId = req.hospital._id;
    const hospital = await Hospital.findById(hospitalId).populate('doctors');
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    res.json({ success: true, doctors: hospital.doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const hospitalId = req.hospital._id;

    // 1. Get doctor IDs for the hospital
    const doctors = await Doctor.find({ hospitalId: hospitalId }).select('_id');
    const doctorIds = doctors.map(doc => doc._id);

    // 2. Get all appointments for these doctors
    const appointments = await appointmentModel.find({ docId: { $in: doctorIds } });

    // 3. Calculate stats
    const totalDoctors = doctorIds.length;
    const totalAppointments = appointments.length;

    const uniquePatientIds = new Set(appointments.map(app => app.userId));
    const totalPatients = uniquePatientIds.size;

    const totalEarnings = appointments
      .filter(app => app.isCompleted)
      .reduce((sum, app) => sum + (app.amount || 0), 0);

    const totalSpecializations = req.hospital.specializations ? req.hospital.specializations.length : 0;

    // 4. Get latest 5 appointments
    const latestAppointments = await appointmentModel.find({ docId: { $in: doctorIds } })
      .sort({ date: -1 })
      .limit(5)
      .populate('docData', 'name image');

    res.json({
      success: true,
      data: {
        doctors: totalDoctors,
        appointments: totalAppointments,
        patients: totalPatients,
        earnings: totalEarnings,
        specializations: totalSpecializations,
        latestAppointments: latestAppointments
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ success: false, message: 'Server Error: Could not fetch dashboard data.' });
  }
};
