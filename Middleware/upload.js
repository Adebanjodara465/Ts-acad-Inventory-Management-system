const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

//bring in our cloudinary
const cloudinary = require('../Config/cloudinary');

//method for uploading images to cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bokusuppermarket',
        allowed_formats: ['jpg', 'png', 'gif'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});

const upload = multer({ storage: storage });

module.exports = upload;