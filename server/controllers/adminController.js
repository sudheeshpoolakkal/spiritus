import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';
import feedbackModel from '../models/feedbackModel.js';
import hospitalModel from '../models/hospitalModel.js';
import doctorRegistrationModel from '../models/doctorRegistrationModel.js';

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address, available = false } = req.body;
    const imageFile = req.file;

    // Checking for all required data
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter a valid email" });
    }

    // Validate strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Please Enter a Strong Password" });
    }

    // Hash doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary using buffer if available
    let imageUrl;
    if (imageFile && imageFile.buffer) {
      // Memory storage: use upload_stream with transformation
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            // This tells Cloudinary to auto-crop to a 1:1 aspect ratio
            // and "fill" the entire square. For better face-detection,
            // you can use gravity: "face" or gravity: "auto"
            transformation: [
              { crop: "fill", aspect_ratio: "1.0", gravity: "auto" }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        uploadStream.end(imageFile.buffer);
      });
    } else if (imageFile && imageFile.path) {
      // Disk storage fallback
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        transformation: [
          { crop: "fill", aspect_ratio: "1.0", gravity: "auto" }
        ]
      });
      imageUrl = imageUpload.secure_url;
    } else {
      return res.json({ success: false, message: "No image file provided" });
    }

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      available: available === 'true',
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};


//API FOR ADMIN LOGIN
const loginAdmin = async (req,res) => {
    try {
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
        {
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        } else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.error(error); // Log the error for better debugging
        res.json({ success: false, message:error.message});
    }
}

// api to get all doctors list for admn panel
const allDoctors= async(req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error)
    {
        console.error(error); // Log the error for better debugging
        res.json({ success: false, message:error.message});
    }
}

// API to get all Appointments list
const appointmentsAdmin = async (req,res) =>{
    try{
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    }
    catch(error){
        console.error(error); // Log the error for better debugging
        res.json({ success: false, message:error.message});
    }
}

// API for Appointment cancellation
const appointmentCancel = async (req, res) => {
    try {
      const { appointmentId } = req.body;
  
      // Fetch the appointment details
      const appointmentData = await appointmentModel.findById(appointmentId);
      if (!appointmentData) {
        return res.json({ success: false, message: "Appointment not found." });
      }
  
      // Mark the appointment as cancelled
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
  
      // Release the doctor slot
      const { docId, slotDate, slotTime } = appointmentData;
  
      const doctorData = await doctorModel.findById(docId);
      if (!doctorData) {
        return res.json({ success: false, message: "Doctor not found." });
      }
  
      let { slots_booked } = doctorData;
  
      // Ensure slots_booked exists and slotDate is defined
      if (!slots_booked[slotDate]) {
        return res.json({ success: false, message: `No bookings found for the date ${slotDate}.` });
      }
  
      // Filter out the slot
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
  
      // Update the doctor's slots
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  
      // Send success response
      res.json({ success: true, message: "Appointment Cancelled.." });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };


// API to get Dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});
    const unreadFeedbacks = await feedbackModel.countDocuments({ isRead: false });
    const patients = await userModel.find({});
    const hospitals = await hospitalModel.countDocuments({ isReviewed: true });
  
    let adminEarnings = 0;
    // For each paid appointment, admin earns 16% of the base fee.
    appointments.forEach(item => {
      if (item.payment) {
        adminEarnings += item.amount * 0.16;
      }
    });
  
    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      earnings: adminEarnings.toFixed(2), // 2 decimal places
      unreadFeedbacks,
      hospitals: hospitals,
      latestAppointments: appointments.reverse().slice(0, 5)
    };
  
    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// API to get all feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, feedbacks });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark feedback as read
const markFeedbackAsRead = async (req, res) => {
  try {
    const { feedbackId } = req.body;
    
    const feedback = await feedbackModel.findById(feedbackId);
    if (!feedback) {
      return res.json({ success: false, message: "Feedback not found" });
    }
    
    feedback.isRead = true;
    await feedback.save();
    
    res.json({ success: true, message: "Feedback marked as read" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to delete feedback
const deleteFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.body;
    
    const result = await feedbackModel.findByIdAndDelete(feedbackId);
    if (!result) {
      return res.json({ success: false, message: "Feedback not found" });
    }
    
    res.json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
  

const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, hospitals });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getAllDoctorRegistrations = async (req, res) => {
  try {
    const doctors = await doctorRegistrationModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const markHospitalAsReviewed = async (req, res) => {
  try {
    const { hospitalId } = req.body;
    const hospital = await hospitalModel.findById(hospitalId);
    if (!hospital) {
      return res.json({ success: false, message: 'Hospital not found' });
    }
    hospital.isReviewed = true;
    await hospital.save();
    res.json({ success: true, message: 'Hospital marked as reviewed' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const markDoctorRegistrationAsReviewed = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await doctorRegistrationModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: 'Doctor registration not found' });
    }
    doctor.isReviewed = true;
    await doctor.save();
    res.json({ success: true, message: 'Doctor registration marked as reviewed' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const { hospitalId } = req.body;
    const result = await hospitalModel.findByIdAndDelete(hospitalId);
    if (!result) {
      return res.json({ success: false, message: 'Hospital not found' });
    }
    res.json({ success: true, message: 'Hospital deleted successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteDoctorRegistration = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const result = await doctorRegistrationModel.findByIdAndDelete(doctorId);
    if (!result) {
      return res.json({ success: false, message: 'Doctor registration not found' });
    }
    res.json({ success: true, message: 'Doctor registration deleted successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Add Hospital functionality
const addHospital = async (req, res) => {
  try {
    const {
      hospitalName,
      type,
      yearEstablished,
      address,
      country,
      state,
      district,
      pinCode,
      contactNumber,
      emailAddress,
      website,
      keyContact,
      mentalHealthProfessionals,
      specializations,
      currentFees,
      teletherapy,
      operatingHours,
      emergencySupport,
      averagePatientLoad,
      insuranceTies,
      accreditations,
      acknowledgement,
      password
    } = req.body;

    // ✅ All field Allowed
    const allowedTypes = [
      'hospital', 'clinic', 'government', 'rehab', 'counseling', 'community', 'other'
    ];

    if (!allowedTypes.includes(type)) {
      return res.json({
        success: false,
        message: `Invalid hospital type.`
      });
    }

    // ✅ Validate required uploads
    if (!req.files?.hospitalLogo || !req.files?.hospitalLicense) {
      return res.json({ success: false, message: 'Hospital logo and license are required' });
    }

    // ✅ Validate Password
    if (!password || password.length < 8) {
      return res.json({ success: false, message: 'Password must be at least 8 characters' });
    }

    // ✅ Normalize email
    const normalizedEmail = emailAddress.trim().toLowerCase();

    // ✅ Check duplicate hospital by email in both possible fields
    const existingHospital = await hospitalModel.findOne({
      $or: [{ email: normalizedEmail }, { emailAddress: normalizedEmail }]
    });
    if (existingHospital) {
      return res.json({ success: false, message: 'Hospital with this email already exists' });
    }

    // ✅ Upload Logo to Cloudinary
    const hospitalLogoUrl = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          transformation: [{ crop: "fill", aspect_ratio: "1.0", gravity: "auto" }]
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(req.files.hospitalLogo[0].buffer);
    });

    // ✅ Upload License to Cloudinary
    const hospitalLicenseUrl = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image", // If PDF, change this to 'raw'
          transformation: [{ crop: "fill", gravity: "auto" }]
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(req.files.hospitalLicense[0].buffer);
    });

    // ✅ Save new hospital
    const newHospital = new hospitalModel({
      hospitalName,
      type,
      yearEstablished,
      address,
      country,
      state,
      district,
      pinCode,
      contactNumber,
      emailAddress: normalizedEmail,
      website,
      keyContact,
      mentalHealthProfessionals,
      specializations: JSON.parse(specializations),
      currentFees,
      teletherapy,
      operatingHours,
      emergencySupport,
      averagePatientLoad,
      insuranceTies,
      accreditations,
      hospitalLogo: hospitalLogoUrl,
      hospitalLicense: hospitalLicenseUrl,
      acknowledgement: acknowledgement === 'true' || acknowledgement === true,
      isReviewed: true,
      password,
      email: normalizedEmail,
      name: hospitalName
    });

    await newHospital.save();

    return res.json({ success: true, message: 'Hospital added successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const assignDoctorToHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const { doctorId } = req.body;

    const hospital = await hospitalModel.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Add doctor to hospital's list if not already present
    if (!hospital.doctors.includes(doctorId)) {
      hospital.doctors.push(doctorId);
      await hospital.save();
    }

    // Assign hospital to doctor
    doctor.hospitalId = hospitalId;
    await doctor.save();

    res.json({ success: true, message: 'Doctor assigned to hospital successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Updated export statement - add addHospital to the list
export {
  addDoctor, 
  loginAdmin, 
  allDoctors, 
  appointmentsAdmin, 
  appointmentCancel,
  adminDashboard, 
  deleteFeedback, 
  markFeedbackAsRead, 
  getAllFeedbacks,
  getAllHospitals, 
  getAllDoctorRegistrations, 
  markHospitalAsReviewed,
  markDoctorRegistrationAsReviewed, 
  deleteHospital, 
  deleteDoctorRegistration,
  addHospital,  // Add this to the export list
  assignDoctorToHospital
};