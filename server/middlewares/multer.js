import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');  // Ensure this directory exists
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);  // Save the file with its original name
    }
});

const upload = multer({ storage });

export default upload;  // Export the upload instance
