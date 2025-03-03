import multer from 'multer';

const storage = multer.memoryStorage(); // Use memory storage instead of disk storage
const upload = multer({ storage });

export default upload;
