const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { handleUpload } = require('../controllers/uploadController');

router.post('/file', upload.single('file'), handleUpload);

module.exports = router;