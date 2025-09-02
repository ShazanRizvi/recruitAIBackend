const express = require('express');
const multer = require('multer');
const atsController = require('../controllers/atsController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/resume_score', upload.single('resume'), atsController.scoreResumeByPosition);

module.exports = router;
