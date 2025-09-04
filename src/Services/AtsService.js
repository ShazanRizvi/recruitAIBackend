const fs = require("fs-extra");
const path = require("path");
const { extractTextFromResume } = require("../utils/ResumeParser");
const { getKeywordsFromAI } = require("../utils/KeywordExtraction");
const {
  fuzzyMatchKeywords,
  embeddingMatchKeywords,
} = require("../utils/matchingUtils");
const { downloadFile, blobtoStream, deleteFile } = require("./StorageService");

exports.calculateScoreWithAI = async (resumeFile, jobPosition) => {
  const filename = resumeFile.filename || resumeFile.originalname; 

  console.log("Downloading file:", filename);

  const fileBlob = await downloadFile(filename);
  const fileStream = await blobtoStream(fileBlob);

  const resumeText = await extractTextFromResume({
    stream: fileStream,
    originalname: filename,
  });

  // Get relevant keywords for jobPosition using AI
  const jobKeywords = await getKeywordsFromAI(jobPosition);

  const fuzzyMatches = fuzzyMatchKeywords(resumeText, jobKeywords);

  const embeddingMatches = await embeddingMatchKeywords(
    resumeText,
    jobKeywords
  );

  // Simple keyword scoring
  //const resumeWords = resumeText.toLowerCase().split(/\W+/);
  const matchedKeywords = Array.from(
    new Set([...fuzzyMatches, ...embeddingMatches])
  );
  const missingKeywords = jobKeywords.filter(
    (kw) => !matchedKeywords.includes(kw)
  );

  const score = Math.round((matchedKeywords.length / jobKeywords.length) * 100);

  // Cleanup uploaded file
  //fs.unlinkSync(resumeFile.path);
  const data = deleteFile(filename);
  console.log("Deleted file:", filename, data);


  return {
    score: score,
    matchedKeywords: matchedKeywords,
    missingKeywords: missingKeywords,
  };
};
