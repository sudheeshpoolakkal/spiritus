import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, required: true, default: true },
  fees: { type: Number, required: true },
   address: { 
    type: Object, 
    required: true,
    default: {
      line1: { type: String },           // Traditional address line 1
      line2: { type: String },           // Traditional address line 2
      plusCode: { type: String },        // Google Plus Code (e.g., "GWW4+8G Thiruvananthapuram, Kerala")
      coordinates: {                     // Optional: store lat/lng for faster access
        lat: { type: Number },
        lng: { type: Number }
      },
      formatted: { type: String },       // Full formatted address from Google
      placeId: { type: String }         // Google Place ID for more accurate identification
    }
  },
  languages: { type: [String], default: [] },
  degree: { type: String, required: true },
  date: { type: Number, required: true },
  slots_booked: { type: Object, default: {} },
  custom_slots: { type: Object, default: {} }, // New field for custom slots
  rating: { type: Number, default: 0 }, // Average rating
  ratingCount: { type: Number, default: 0 }, // Number of ratings
  reviews: [
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String, default: '' } // Review is optional
    }
],
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'hospital' }
}, { minimize: false });

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default doctorModel;