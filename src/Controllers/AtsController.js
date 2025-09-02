const atsService = require('../Services/AtsService');

exports.scoreResumeByPosition = async (req, res) => {
  try {
    const resumeFile = req.file;
    const { jobPosition } = req.body;

    console.log('Resume File', resumeFile)

    if (!jobPosition) return res.status(400).json({ message: 'jobPosition is required' });

    const result = await atsService.calculateScoreWithAI(resumeFile, jobPosition);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate ATS score', error: error.message });
  }
};
