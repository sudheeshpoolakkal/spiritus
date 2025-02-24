import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
//import razorpay from 'razorpay'
import { v2 as cloudinary } from 'cloudinary';
import Stripe from 'stripe';
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with secret key
import CurrencyConverter from 'currency-converter-lt';


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
        const imageFile = req.file; // Use req.file since multer.memoryStorage() processes single file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
        }

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
                        { resource_type: "image" },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    uploadStream.end(imageFile.buffer); // Send the file buffer to Cloudinary
                });

                updateData.image = result.secure_url; // Save the Cloudinary URL
            } catch (cloudinaryError) {
                console.error("Cloudinary Error:", cloudinaryError);
                return res.json({ success: false, message: "Image upload failed." });
            }
        }

        await userModel.findByIdAndUpdate(userId, updateData); // Update the user's profile with Cloudinary URL

        res.json({ success: true, message: "Profile Updated!" });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.json({ success: false, message: error.message });
    }
};

// API to Book Appointment
const bookAppointment = async (req, res) => {

    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData || !docData.available) {
            return res.json({ success: false, message: 'Doctor not Available' });
        }

        let slots_booked = docData.slots_booked || {}; // Ensure slots_booked is initialized

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
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Save updated slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: 'Appointment Booked' });
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

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

//API to make payment for appointment using stripe

/*
const paymentStripe = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled || appointmentData.paid) {
            return res.json({ success: false, message: "Invalid appointment" });
        }

        const converter = new CurrencyConverter();

        // Ensure currency is set properly
        let currency = process.env.CURRENCY && process.env.CURRENCY.trim(); // Trim to remove spaces

        if (!currency) {
            currency = 'CHF'; // Default to Swiss Franc (or change to preferred default)
            console.warn("CURRENCY environment variable is not set. Using default: CHF");
        }

        // Convert INR to target currency
        // ... (rest of the commented code)
*/
/*...*/
/*
        res.json({ success: true, clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Stripe payment error:", error);
        res.json({ success: false, message: error.message });
    }
};
*/
/*...*/
/*
const createCheckoutSession = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled || appointmentData.paid) {
            return res.json({ success: false, message: "Invalid appointment" });
        }

        // Using your conversion factor, convert the appointment amount from INR to CHF.
        const exchangeRate = 0.011;
        const chfAmount = appointmentData.amount * exchangeRate;
        const amountInCents = Math.round(chfAmount * 100);

        if (amountInCents < 50) {
            return res.json({ success: false, message: "Minimum amount is CHF 0.50" });
        }

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: (process.env.CURRENCY && process.env.CURRENCY.trim().toLowerCase()) || 'chf',
                    product_data: {
                        name: `Appointment fee`,
                        description: `Payment for appointment ${appointmentId}`
                    },
                    unit_amount: amountInCents,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata: { appointment_id: appointmentId },
        });

        // Optionally save the session ID for later reference.
        await appointmentModel.findByIdAndUpdate(appointmentId, { paymentSessionId: session.id });

        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        console.error("Stripe session error:", error);
        res.json({ success: false, message: error.message });
    }
};
*/

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

            await doctorModel.findByIdAndUpdate(docId, { slots_booked });
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
      
      // Simulate payment: mark the appointment as paid.
      appointmentData.payment = true;
      await appointmentData.save();
      
      res.json({ success: true, message: "Payment processed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
};


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, getVideoCallLink, processPayment  };
