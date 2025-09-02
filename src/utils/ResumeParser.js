const fs = require('fs-extra');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

async function extractTextFromResume(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  const filePath = file.path;


  if (ext === '.pdf') {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
     console.log('Extracted text length:', data.text.length);
    return data.text;
  } else if (ext === '.docx') {
    const data = await mammoth.extractRawText({ path: filePath });
    console.log('Extracted text length:', data.value);
    return data.value;
  } else {
    throw new Error('Unsupported file format. Please upload a PDF or DOCX file.');
  }
}

module.exports = { extractTextFromResume };
