import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import feedbackModel from "../models/feedbackModel.js";
//import razorpay from 'razorpay'
import { v2 as cloudinary } from 'cloudinary';
// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Dtails..." });
        }

        // Validating Email Format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email..." });
        }

        // Validating Strong Password
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Enter a Strong Password...",
            });
        }

        // Hashing User Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API TO GET USER PROFILE DATA
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select("-password");
        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API TO UPDATE USER PROFILE
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file; // using multer's memoryStorage

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    console.log("Update Profile Request:", req.body);

    const updateData = {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    };

    if (imageFile) {
      try {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { 
              resource_type: "image",
              transformation: [
                { crop: "fill", aspect_ratio: "1.0", gravity: "auto" }
              ]
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(imageFile.buffer);
        });

        console.log("Cloudinary Upload Result:", result);
        updateData.image = result.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary Error:", cloudinaryError);
        return res.json({ success: false, message: "Image upload failed." });
      }
    }

    await userModel.findByIdAndUpdate(userId, updateData);

    res.json({ success: true, message: "Profile Updated!" });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.json({ success: false, message: error.message });
  }
};
// NEW FUNCTION: uploadProfileImage
const uploadProfileImage = async (req, res) => {
    try {
      // Use the userId from req.body if available; otherwise, decode the token manually.
      let userId = req.body.userId;
      if (!userId) {
        const { token } = req.headers;
        if (!token) {
          return res.json({ success: false, message: "Not authorized. Login again" });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = token_decode.id;
      }
  
      const imageFile = req.file;
      if (!userId) {
        return res.json({ success: false, message: "User ID missing" });
      }
      if (!imageFile) {
        return res.json({ success: false, message: "No image file provided" });
      }
  
      // Auto-crop to a 1:1 aspect ratio using Cloudinary transformation
      let imageUrl;
      try {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "image",
              transformation: [{ crop: "fill", aspect_ratio: "1.0", gravity: "auto" }],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(imageFile.buffer);
        });
        imageUrl = result.secure_url;
      } catch (cloudError) {
        console.error("Cloudinary Error:", cloudError);
        return res.json({ success: false, message: "Image upload failed" });
      }
  
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
      res.json({ success: true});
    } catch (error) {
      console.error("uploadProfileImage Error:", error);
      res.json({ success: false, message: error.message });
    }
  };


// API to Book Appointment
const bookAppointment = async (req, res) => {
  try {
      const { userId, docId, slotDate, slotTime, patientDescription } = req.body;
      const docData = await doctorModel.findById(docId).select('-password');
      if (!docData || !docData.available) {
          return res.json({ success: false, message: 'Doctor not Available' });
      }
      let slots_booked = docData.slots_booked || {};

      // Checking for slot availability
      if (slots_booked[slotDate]) {
          if (slots_booked[slotDate].includes(slotTime)) {
              return res.json({ success: false, message: 'Slot not Available' });
          }
          slots_booked[slotDate].push(slotTime);
      } else {
          slots_booked[slotDate] = [slotTime];
      }

      const userData = await userModel.findById(userId).select('-password');
      // Remove sensitive data before adding to appointment data
      delete docData.slots_booked;

      const appointmentData = {
          userId,
          docId,
          userData,
          docData,
          amount: docData.fees,
          slotTime,
          slotDate,
          date: Date.now(),
          patientDescription: patientDescription || ''
      };

      // If an audio file is provided, upload it to Cloudinary and add the URL
      if (req.file) {
        try {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { resource_type: "video" },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );
            uploadStream.end(req.file.buffer);
          });
          appointmentData.audioMessage = result.secure_url;
        } catch (cloudinaryError) {
          console.error("Cloudinary Audio Upload Error:", cloudinaryError);
          return res.json({ success: false, message: "Audio upload failed." });
        }
      }

      const newAppointment = new appointmentModel(appointmentData);
      await newAppointment.save();
      // Save updated slots data in docData
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });

      res.json({ success: true, message: 'Pay to confirm the appointment!' });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



//  API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }



        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: "Unauthorized action.." });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;

        if (slots_booked && slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

            //await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        }

        res.json({ success: true, message: "Appointment Cancelled.." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const getVideoCallLink = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        res.json({ videoCallLink: appointment.videoCallLink || "" }); // Return only the link
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//API TO PROCESS DEMO PAYMENT
const processPayment = async (req, res) => {
    try {
      const { appointmentId } = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
      
      console.log("Processing payment for appointment:", appointmentData);
      
      if (!appointmentData || appointmentData.cancelled || appointmentData.payment) {
        return res.status(400).json({ success: false, message: "Invalid appointment" });
      }
      
      // Mark appointment as paid.
      appointmentData.payment = true;
      await appointmentData.save();
      
      res.json({ success: true, message: "Payment processed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const rateDoctor = async (req, res) => {
    try {
        const { appointmentId, rating, review, docId, userId } = req.body;

        if (!appointmentId || !rating || !docId || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: appointmentId, rating, docId, or userId'
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Find the appointment
        const appointment = await appointmentModel.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        // Verify that the appointment belongs to the user
        if (appointment.userId !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to rate this appointment'
            });
        }

        // Check if the appointment has already been rated/reviewed
        if (appointment.rating) {
            return res.status(400).json({
                success: false,
                message: 'You have already rated this appointment'
            });
        }

        // Verify that the appointment is completed
        if (!appointment.isCompleted || appointment.cancelled) {
            return res.status(400).json({
                success: false,
                message: 'Only completed appointments can be rated'
            });
        }

        // Update the appointment with the rating & review
        appointment.rating = rating;
        if (review) {
            appointment.review = review; // Store review only if provided
        }
        await appointment.save();

        // Update the doctor's rating and review
        const doctor = await doctorModel.findById(docId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Calculate new rating average
        const totalRating = doctor.rating * doctor.ratingCount + rating;
        const newRatingCount = doctor.ratingCount + 1;
        const newRating = totalRating / newRatingCount;

        // Update the doctor's record
        doctor.rating = newRating;
        doctor.ratingCount = newRatingCount;

        // Add the review to the doctor's review array if provided
        if (review) {
            doctor.reviews.push({ userId, rating, review });
        }

        await doctor.save();

        return res.status(200).json({
            success: true,
            message: 'Rating and review submitted successfully',
            data: {
                newRating: doctor.rating,
                ratingCount: doctor.ratingCount,
                reviews: doctor.reviews
            }
        });

    } catch (error) {
        console.error('Error in rateDoctor:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Check if all fields are provided
    if (!name || !email || !message) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    
    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    
    // Create new feedback
    const feedback = new feedbackModel({
      name,
      email,
      message
    });
    
    await feedback.save();
    
    res.json({ success: true, message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

  
       

export { registerUser, loginUser, getProfile, uploadProfileImage, updateProfile, bookAppointment, listAppointment, cancelAppointment, getVideoCallLink, processPayment, rateDoctor, submitFeedback  };