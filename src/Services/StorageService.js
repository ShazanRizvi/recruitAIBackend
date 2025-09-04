const supabase = require("../../Supabase/supabaseClient");
const dotenv = require("dotenv");
const { Readable } = require("stream");

dotenv.config();

async function uploadFile(filename, fileBuffer, mimetype) {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME)
    .upload(filename, fileBuffer, { contentType: mimetype, upsert: true });
  if (error) throw error;
  return data;
}

async function deleteFile(filename) {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME)
    .remove([filename]);
  if (error) throw error;
  return data;
}

async function downloadFile(filename) {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET_NAME)
    .download(filename);
  if (error) throw error;
  return data;
}

//helper for blob to stream
async function blobtoStream(blobData) {
  // Convert Blob to ArrayBuffer, then to Node.js Buffer
  const arrayBuffer = await blobData.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Create a Readable stream and push the buffer data
  const stream = new Readable();
  stream._read = () => {}; // noop _read implementation
  stream.push(buffer);
  stream.push(null); // Indicate end of stream

  return stream;
}

module.exports = { uploadFile, deleteFile, downloadFile, blobtoStream };
