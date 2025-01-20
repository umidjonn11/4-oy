// photoRoutes.js
import express from 'express';
import multer from 'multer';
import { photoController } from '../controllers/photoController.js';

const router = express.Router();

// Set up Multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the folder where the files will be saved
    cb(null, 'uploads'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    // Set the filename (we are using original filename here)
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

// Define the route for uploading a single image
router.post('/upload', upload.single('image'), photoController.create);

export default router;
