// controllers/prescriptionController.js
import Prescription from '../models/Prescription.js';
import Appointment from '../models/appointmentModel.js';
import { v2 as cloudinary } from 'cloudinary';

// Add prescription and report
export const addPrescription = async (req, res) => {
    try {
      console.log('Request Body:', req.body); // Log the request body
      console.log('Request File:', req.file); // Log the uploaded file
  
      const { appointmentId, report } = req.body;
      const file = req.file;
  
      // Validate report length
      if (report.split(' ').length < 30) {
        return res.status(400).json({ success: false, message: 'Report must be at least 30 words.' });
      }
  
      // Check if appointment exists
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found.' });
      }
  
      let prescriptionFileUrl = null;
      if (file) {
        console.log('Uploading file to Cloudinary...'); // Log before uploading
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'auto',
        });
        prescriptionFileUrl = result.secure_url;
        console.log('File uploaded to Cloudinary:', prescriptionFileUrl); // Log the Cloudinary URL
      }
  
      // Save prescription to MongoDB
      const newPrescription = new Prescription({
        appointmentId,
        report,
        prescriptionFile: prescriptionFileUrl,
      });
      await newPrescription.save();
      console.log('Prescription saved to MongoDB:', newPrescription); // Log the saved prescription
  
      res.status(201).json({ success: true, message: 'Prescription added successfully.', prescription: newPrescription });
    } catch (error) {
      console.error('Error in addPrescription:', error); // Log the full error
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  };

// Get prescription by appointment ID
export const getPrescription = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const prescription = await Prescription.findOne({ appointmentId });
    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found.' });
    }

    res.status(200).json({ success: true, prescription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};