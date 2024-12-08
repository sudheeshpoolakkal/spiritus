/*import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads'); // Ensure this directory exists
    },
    filename: function (req, file, callback) {
        // Generate a unique filename with the original extension
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        callback(null, uniqueName);
    }
});

// Initialize multer
const upload = multer({ storage });

export default upload;
*/










import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');  // Ensure this directory exists
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);  // Save the file with its original name
    }
});

const upload = multer({ storage });

export default upload; 