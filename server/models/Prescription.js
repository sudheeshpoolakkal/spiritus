import mongoose from 'mongoose';

const PrescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  report: {
    type: String,
    required: true,
  },
  prescriptionFile: {
    type: String, // Cloudinary URL
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Prescription', PrescriptionSchema);
