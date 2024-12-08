import express from 'express';
import { addDoctor } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';  // Ensure the correct path

const adminRouter = express.Router();

// Test route to verify file upload
adminRouter.post('/add-doctor', upload.single('image'), addDoctor);
/*adminRouter.post('/add-doctor', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "File not uploaded" });
    }
    res.json({ success: true, file: req.file });
});*/

export default adminRouter;
