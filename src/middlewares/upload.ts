import multer from 'multer';
import path from 'path';

// Configure multer storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/');
    },
    filename: (req, file, cb) => {
        // Specify the filename for uploaded files
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

export default upload;
