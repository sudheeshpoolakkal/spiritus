import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    consultationMode: { type: String, enum: ['online', 'offline'], required: true },
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
    videoCallLink: String, 
    rating: { type: Number, min: 1, max: 5 }, 
    review: { type: String, default: '' }, 
    patientDescription: { type: String, default: '' }, 
    meetingCompleted: { type: Boolean, default: false },
    audioMessage: { type: String, default: '' } 
});

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);

export default appointmentModel;
