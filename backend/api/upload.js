const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Media = require('../models/Media');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.fields([{ name: 'thumbnail' }, { name: 'video' }]), async (req, res) => {
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
    res.json({ success: true, media });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const media = await Media.find();
    res.json({ success: true, media });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
