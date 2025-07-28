// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads'); 
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   console.log('Multer Debugging:');
//   console.log('  File originalname:', file.originalname);
//   console.log('  File mimetype:', file.mimetype); 
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) cb(null, true);
//   else cb(new Error('Only images are allowed'));
// };

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter
// });

// export default upload;


// backend/middleware/uploadMiddleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // For ensuring directory exists

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  console.log('Multer Debugging:');
  console.log('  File originalname:', file.originalname);
  console.log('  File mimetype:', file.mimetype);

  // --- FIX IS HERE ---
  // The regex should match the full MIME type strings
  const allowedMimeTypes = /image\/jpeg|image\/jpg|image\/png|image\/gif/; // Corrected regex for MIME types
  // You might also want to ensure the extension is one of these, but MIME type is more reliable
  const allowedExtensions = /\.(jpeg|jpg|png|gif)$/i; // Regex to check file extension (case-insensitive)

  const extnameIsValid = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetypeIsValid = allowedMimeTypes.test(file.mimetype);

  console.log('  Extname test result:', extnameIsValid);
  console.log('  Mimetype test result:', mimetypeIsValid); // This should now be true for image/jpeg

  if (extnameIsValid && mimetypeIsValid) { // Both conditions must be met
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, PNG, GIF images are allowed!'), false); // More specific error message
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter
});

export default upload;