const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  // creates the storage object for a cloudinary POST request. 
    // folder sets folder on cloudinary that it's being posted to.
    // resource_type set to 'image' for image files.
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'CupOfSugar',
      resource_type: 'image'
    }
  });
  
  const upload = multer({ storage: storage })
  
  
  module.exports = upload;