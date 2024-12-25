const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Media = require('../models/Media');
const upload = multer({ dest: 'uploads/' });

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { title, description } = req.body;
      
      const thumbnail = await cloudinary.uploader.upload(req.files.thumbnail[0].path, { resource_type: 'image' });
      const video = await cloudinary.uploader.upload(req.files.video[0].path, { resource_type: 'video' });

      const media = new Media({
        title,
        description,
        thumbnailUrl: thumbnail.secure_url,
        videoUrl: video.secure_url,
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
