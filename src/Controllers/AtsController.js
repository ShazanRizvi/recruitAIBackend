const atsService = require("../Services/AtsService");
const { uploadFile } = require("../Services/StorageService");

exports.scoreResumeByPosition = async (req, res) => {
  try {

    const resumeFile = req.file;
    const { jobPosition } = req.body;

    console.log("Resume File from controller", resumeFile);

    if (!jobPosition)
      return res.status(400).json({ message: "jobPosition is required" });

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const data = await uploadFile(resumeFile.originalname, resumeFile.buffer, resumeFile.mimetype);

    const result = await atsService.calculateScoreWithAI(
      resumeFile,
      jobPosition
    );
    res.status(200).json({ result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to calculate ATS score", error: error.message });
  }
};
