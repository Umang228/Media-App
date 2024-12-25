const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Media = require('../models/Media');

const upload = multer({ storage: multer.memoryStorage() });

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { title, description } = req.body;

      const uploadToCloudinary = (file, resourceType) =>
        new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: resourceType },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          file.stream.pipe(uploadStream);
        });

      const thumbnailResult = await uploadToCloudinary(req.files.thumbnail[0], 'image');
      const videoResult = await uploadToCloudinary(req.files.video[0], 'video');

      const media = new Media({
        title,
        description,
        thumbnailUrl: thumbnailResult.secure_url,
        videoUrl: videoResult.secure_url,
      });

      await media.save();
      res.status(200).json({ success: true, media });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const media = await Media.find();
      res.status(200).json({ success: true, media });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(404).json({ success: false, message: 'Not Found' });
  }
};
