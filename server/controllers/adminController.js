import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address,available = false } = req.body;
        const imageFile = req.file;

        // Checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a valid email" });
        }

        // Validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter a Strong Password" });
        }

        // Hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

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
            address: JSON.parse(address), // Ensure the incoming address is in JSON format
            available: available === 'true',
            date: Date.now(),
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added" });

    } catch (error) {
        console.error(error); // Log the error for better debugging
        res.status(500).json({ success: false, message: "An error occurred." });
    }
}

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
const adminDashboard = async (req,res) =>{

    try {
        
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})


    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }

}
  

export { addDoctor , loginAdmin , allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };


