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


import multer from 'multer';
import path from 'path';
import fs from 'fs'; 

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

  const allowedMimeTypes = /image\/jpeg|image\/jpg|image\/png|image\/gif/; 
  const allowedExtensions = /\.(jpeg|jpg|png|gif)$/i; 

  const extnameIsValid = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimetypeIsValid = allowedMimeTypes.test(file.mimetype);

  console.log('  Extname test result:', extnameIsValid);
  console.log('  Mimetype test result:', mimetypeIsValid); 

  if (extnameIsValid && mimetypeIsValid) { 
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, PNG, GIF images are allowed!'), false); 
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter
});

export default upload;