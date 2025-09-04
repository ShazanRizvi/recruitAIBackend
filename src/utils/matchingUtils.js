const Fuse = require('fuse.js');
const { getEmbedding, cosineSimilarity } = require('./embeddingUtils');

exports.fuzzyMatchKeywords = function (resumeText, jobKeywords) {
  const fuse = new Fuse(resumeText.split(/\s+/), { threshold: 0.3 });
  return jobKeywords.filter(kw => fuse.search(kw).length > 0);
};

exports.embeddingMatchKeywords = async function (resumeText, jobKeywords) {
  const resumeEmbedding = await getEmbedding(resumeText);
  // threshold: similarity above 0.7 considered a match
  const matches = [];
  for (const kw of jobKeywords) {
    const kwEmbedding = await getEmbedding(kw);
    if (cosineSimilarity(resumeEmbedding, kwEmbedding) > 0.7) {
      matches.push(kw);
    }
  }
  return matches;
};