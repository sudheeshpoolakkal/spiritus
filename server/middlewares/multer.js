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