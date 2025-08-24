import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Clear the cached model if it exists
if (mongoose.models.Hospital) {
  delete mongoose.models.Hospital;
}

const hospitalSchema = new mongoose.Schema({
  // Basic hospital information
  hospitalName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['hospital', 'clinic', 'government', 'rehab', 'counseling', 'community', 'other'],
    required: true,
  },
  yearEstablished: {
    type: Number,
    required: true,
  },
  
  // Authentication fields
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  // Location information
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
  
  // Contact information
  phone: {
    type: String,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  keyContact: {
    type: String,
  },
  
  // Medical services information
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
  
  // Certification and documentation
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
  
  // Administrative fields
  acknowledgement: {
    type: Boolean,
    required: true,
  },
  isReviewed: {
    type: Boolean,
    default: false,
  },
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
hospitalSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login
hospitalSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const hospitalModel = mongoose.model('Hospital', hospitalSchema);
export default hospitalModel;