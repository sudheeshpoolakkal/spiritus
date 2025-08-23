import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage(); // Use memory storage instead of disk storage
const upload = multer({ storage });

export default upload;
