import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['public', 'private', 'non-profit', 'specialty', 'rehabilitation', 'community', 'other'],
    required: true,
  },
  yearEstablished: {
    type: Number,
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
  keyContact: {
    type: String,
  },
  mentalHealthProfessionals: {
    type: Number,
    required: true,
  },
  specializations: {
    type: [String],
    required: true,
  },
  currentFees: {
    type: String,
    required: true,
  },
  teletherapy: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
  operatingHours: {
    type: String,
  },
  emergencySupport: {
    type: String,
    enum: ['yes', 'no'],
  },
  averagePatientLoad: {
    type: Number,
    required: true,
  },
  insuranceTies: {
    type: String,
  },
  accreditations: {
    type: String,
    required: true,
  },
  hospitalLicense: {
    type: String, // URL to Cloudinary
    required: true,
  },
  hospitalLogo: {
    type: String, // URL to Cloudinary
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

const hospitalModel = mongoose.model('Hospital', hospitalSchema);

export default hospitalModel;