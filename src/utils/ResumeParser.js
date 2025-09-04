const fs = require("fs-extra");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const path = require("path");

async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

async function extractTextFromResume(file) {
  const ext = path.extname(file.originalname).toLowerCase();

  let data;

  if (ext === ".pdf") {
    let dataBuffer;

    if (file.buffer) {
      dataBuffer = file.buffer;
    } else if (file.stream) {
      dataBuffer = await streamToBuffer(file.stream);
    } else if (file.path) {
      dataBuffer = fs.readFileSync(file.path);
    } else {
      throw new Error("File input must have buffer, stream, or path");
    }

    data = await pdfParse(dataBuffer);
    console.log("Extracted text length:", data.text.length);
    return data.text;
  } else if (ext === ".docx") {
    if (file.buffer) {
      // mammoth does not support buffer directly, so use from a stream created from buffer
      const stream = bufferToStream(file.buffer);
      data = await mammoth.extractRawText({ stream });
    } else if (file.stream) {
      data = await mammoth.extractRawText({ stream: file.stream });
    } else if (file.path) {
      data = await mammoth.extractRawText({ path: file.path });
    } else {
      throw new Error("File input must have buffer, stream, or path");
    }

    console.log("Extracted text length:", data.value.length);
    return data.value;
  } else {
    throw new Error(
      "Unsupported file format. Please upload a PDF or DOCX file."
    );
  }
}

module.exports = { extractTextFromResume };
