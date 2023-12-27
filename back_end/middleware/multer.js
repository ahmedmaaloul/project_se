// multerConfig.js
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
const ensureUploadsDirExists = () => {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

// Define the storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDirExists();
    cb(null, uploadsDir); // Images will be stored in the "uploads" directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext); // Define the file name with the original extension
  },
});

// Create a Multer instance with the configured storage
const upload = multer({ storage });

module.exports = upload;
