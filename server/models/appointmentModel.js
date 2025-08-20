import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    hospitalId: { type: String, required: false },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    videoCallLink: String, // Store the video call link
    rating: { type: Number, min: 1, max: 5 }, // Rating given by the user
    review: { type: String, default: '' }, // Optional review
    patientDescription: { type: String, default: '' }, // Text description
    meetingCompleted: { type: Boolean, default: false },
    audioMessage: { type: String, default: '' } // New field for audio message URL
});

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);

export default appointmentModel;
