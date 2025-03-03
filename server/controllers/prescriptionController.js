import Prescription from '../models/Prescription.js';
import Appointment from '../models/appointmentModel.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Add prescription and report
export const addPrescription = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    const { appointmentId, report } = req.body;
    const file = req.file;

    // Validate report length
    if (!report || report.split(' ').length < 30) {
      return res
        .status(400)
        .json({ success: false, message: 'Report must be at least 30 words.' });
    }

    // Check if appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: 'Appointment not found.' });
    }

    let prescriptionFileUrl = null;
    let fileType = null;
    let fileName = null;

    if (file && file.buffer) {
      console.log('Uploading file to Cloudinary...');
      // Use upload_stream instead of direct upload
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        // Convert buffer into a readable stream and pipe it to Cloudinary
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      prescriptionFileUrl = result.secure_url;
      fileType = file.mimetype;
      fileName = file.originalname;
      console.log('File uploaded to Cloudinary:', prescriptionFileUrl);
    }

    // Save prescription to MongoDB
    const newPrescription = new Prescription({
      appointmentId,
      report,
      prescriptionFile: prescriptionFileUrl,
    });
    await newPrescription.save();
    console.log('Prescription saved to MongoDB:', newPrescription);

    // Update the appointment document with the prescription details
    await Appointment.findByIdAndUpdate(appointmentId, {
      prescription: {
        report,
        fileUrl: prescriptionFileUrl,
        fileType,
        fileName,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Prescription added successfully.',
      prescription: newPrescription,
    });
  } catch (error) {
    console.error('Error in addPrescription:', error);
    res.status(500).json({ success: false, message: 'Error uploading prescription.' });
  }
};

// Get prescription by appointment ID
export const getPrescription = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const prescription = await Prescription.findOne({ appointmentId });
    if (!prescription) {
      return res
        .status(404)
        .json({ success: false, message: 'Prescription not found.' });
    }
    res.status(200).json({ success: true, prescription });
  } catch (error) {
    console.error('Error in getPrescription:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
