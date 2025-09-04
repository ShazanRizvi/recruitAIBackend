const express = require("express");
const multer = require("multer");
const atsController = require("../controllers/atsController");
const path = require("path");


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/resume_score",
  upload.single("resume"),
  atsController.scoreResumeByPosition
);

module.exports = router;
