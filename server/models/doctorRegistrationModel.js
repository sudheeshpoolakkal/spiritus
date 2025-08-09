import mongoose from 'mongoose';

const doctorRegistrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    enum: ['psychiatrist', 'psychologist', 'counselor', 'therapist', 'social-worker', 'other'],
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  specializations: {
    type: [String],
    required: true,
  },
  consultationFees: {
    type: String,
    required: true,
  },
  teletherapy: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
  availableHours: {
    type: String,
  },
  languagesSpoken: {
    type: [String],
    required: true,
  },
  emergencyConsultation: {
    type: String,
    enum: ['yes', 'no'],
  },
  averagePatientsPerDay: {
    type: Number,
    required: true,
  },
  acceptedInsurance: {
    type: String,
  },
  certifications: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String, // URL to Cloudinary
  },
  licenseCertificate: {
    type: String, // URL to Cloudinary
    required: true,
  },
  acknowledgement: {
    type: Boolean,
    required: true,
  },
  isReviewed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const doctorRegistrationModel = mongoose.model('DoctorRegistration', doctorRegistrationSchema);

export default doctorRegistrationModel;