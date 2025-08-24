import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const changeAvailablity = async (req, res) => {

    try {

        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availability Changed' })

    } catch (error) {
        console.log(error); // Log the error for better debugging
        res.json({ success: false, message: error.message });
    }

}

const doctorList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for doctor
const loginDoctor = async (req, res) => {
    try {

        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: 'Invalid Email or Password' })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {

            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token, docId: doctor._id }) // Ensure docId is included in the response


        }
        else {
            return res.json({ success: false, message: 'Invalid Email or Password' })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to get doctor appointment for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        // No need to modify the query as the appointments collection already includes patientDescription
        const appointments = await appointmentModel.find({ docId }).select('+audioMessage');
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//API to mark appointment as completed

const appointmentComplete = async (req, res) => {
    try {
      // Expect appointmentId from the request body.
      const { appointmentId } = req.body;
  
      // Check if the appointment exists.
      const appointmentData = await appointmentModel.findById(appointmentId);
      if (!appointmentData) {
        return res.json({ success: false, message: 'Appointment not found' });
      }
  
      // Update the appointment in MongoDB to mark it as completed.
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
  
      // Return success message.
      return res.json({
        success: true,
        message: 'Meeting marked as completed',
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  
//API to cancel appointment for docpanel

const appointmentCancel = async (req, res) => {

    try {

        const { docId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment cancelled' })
        }
        else {

            return res.json({ success: false, message: 'cancellation failed' })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {
        // Expect docId to be passed in the body (or extract it from the token if available)
        const { docId } = req.body;
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor id is missing" });
        }
        const appointments = await appointmentModel.find({ docId }).select('+audioMessage');
        console.log(appointments); // Log the fetched appointments for debugging
        let earnings = 0;
        appointments.forEach((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;  // Doctor earns the base fee (appointment.amount)
            }
        });
        let patients = [];
        appointments.forEach((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        });
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        };
        res.json({ success: true, dashData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};  //API TO GET DOCTOR PROFILE FOR DOCTOR PANEL

const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');

        if (!profileData) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }

        res.json({
            success: true,
            profileData: {
                ...profileData.toObject(),
                rating: profileData.rating,
                ratingCount: profileData.ratingCount,
                custom_slots: profileData.custom_slots || {} // Include custom_slots
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API TO UPDATE DOCTOR PROFILE DATA

const updateDoctorProfile = async (req, res) => {

    try {

        const { docId, fees, address, available } = req.body
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
        res.json({ success: true, message: 'Profile updated!' })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to set video call link
const setVideoCallLink = async (req, res) => {
    try {
        const { appointmentId, videoCallLink } = req.body;

        const appointment = await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { videoCallLink },
            { new: true }
        );

        res.json({ success: true, message: "Link saved successfully!", appointment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const submitRating = async (req, res) => {
    try {
        const { docId, rating, review, userId } = req.body;

        if (!docId || !rating || !userId) {
            return res.status(400).json({ success: false, message: "Doctor ID, rating, and user ID are required." });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5." });
        }

        const doctor = await doctorModel.findById(docId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }

        // Store the review if provided
        const newReview = {
            userId,
            rating,
            review: review || "", // If review is optional, store an empty string when not provided
            date: new Date()
        };

        // Add the new review to the doctor's review list
        doctor.reviews.push(newReview);

        // Calculate new average rating
        const newRatingCount = doctor.ratingCount + 1;
        const newRating = ((doctor.rating * doctor.ratingCount) + rating) / newRatingCount;

        // Update doctor details
        doctor.rating = parseFloat(newRating.toFixed(1));
        doctor.ratingCount = newRatingCount;

        await doctor.save();

        res.json({ success: true, message: "Rating & Review submitted successfully!", data: doctor.reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const { docId } = req.params;
        
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required." });
        }

        const doctor = await doctorModel.findById(docId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }

        // Return the reviews
        res.json({ 
            success: true, 
            reviews: doctor.reviews || [] 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getDoctorSlots = async (req, res) => {
    try {
        const { docId } = req.body;
        
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required." });
        }

        const doctor = await doctorModel.findById(docId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }

        // Initialize custom_slots if it doesn't exist
        const customSlots = doctor.custom_slots || {};

        res.json({ 
            success: true, 
            slots: customSlots
        });
    } catch (error) {
        console.error("Error in getDoctorSlots:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const updateDoctorSlots = async (req, res) => {
    try {
        const { docId, date, timeSlots } = req.body;
        
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required." });
        }
        
        if (!date) {
            return res.status(400).json({ success: false, message: "Date is required." });
        }

        const doctor = await doctorModel.findById(docId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }

        // Initialize custom_slots if it doesn't exist
        if (!doctor.custom_slots) {
            doctor.custom_slots = {};
        }

        // Update slots for the specific date
        doctor.custom_slots[date] = timeSlots || [];
        
        // Mark the field as modified for nested objects
        doctor.markModified('custom_slots');
        
        await doctor.save();

        res.json({ 
            success: true, 
            message: "Slots updated successfully!",
            slots: doctor.custom_slots
        });
    } catch (error) {
        console.error("Error in updateDoctorSlots:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteDoctorSlots = async (req, res) => {
    try {
        const { docId, date } = req.body;
        
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required." });
        }
        
        if (!date) {
            return res.status(400).json({ success: false, message: "Date is required." });
        }

        const doctor = await doctorModel.findById(docId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }

        // Initialize custom_slots if it doesn't exist
        if (!doctor.custom_slots) {
            doctor.custom_slots = {};
        }

        // Remove slots for the specific date
        if (doctor.custom_slots[date]) {
            delete doctor.custom_slots[date];
            doctor.markModified('custom_slots');
            await doctor.save();
        }

        res.json({ 
            success: true, 
            message: "Slots deleted successfully!",
            slots: doctor.custom_slots
        });
    } catch (error) {
        console.error("Error in deleteDoctorSlots:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single doctor by ID with custom_slots
const getDoctorById = async (req, res) => {
  try {
    const { docId } = req.params;
    
    const doctor = await doctorModel.findById(docId).select('-password');
    
    if (!doctor) {
      return res.json({ success: false, message: 'Doctor not found' });
    }
    
    res.json({ success: true, doctor });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
    changeAvailablity,
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile,
    setVideoCallLink,
    submitRating,
    getReviews,
    getDoctorSlots,
    updateDoctorSlots,
    deleteDoctorSlots,
    getDoctorById,
}