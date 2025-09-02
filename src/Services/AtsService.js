const fs = require('fs-extra')
const path = require('path');
const { extractTextFromResume } = require('../utils/ResumeParser');
const { getKeywordsFromAI } = require('../utils/ResumeExtraction');

exports.calculateScoreWithAI = async (resumeFile, jobPosition) => {
  
  const resumeText = await extractTextFromResume(resumeFile);

  // Get relevant keywords for jobPosition using AI
  const jobKeywords = await getKeywordsFromAI(jobPosition);

  // Simple keyword scoring
  const resumeWords = resumeText.toLowerCase().split(/\W+/);
  const matched = jobKeywords.filter(word => resumeWords.includes(word.toLowerCase()));
  const missing = jobKeywords.filter(word => !resumeWords.includes(word.toLowerCase()));

  const score = (matched.length / jobKeywords.length) * 100;

  // Cleanup uploaded file
  fs.unlinkSync(resumeFile.path);

  return {
    score: Math.round(score),
    matchedKeywords: matched,
    missingKeywords: missing,
  };
};
