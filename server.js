// Import the express module
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const atsRoute = require('./src/Routes/AtsRoute');
const fs = require('fs');
const path = require('path');

// Create an instance of express
const app = express();
dotenv.config();

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


// Set the port (use environment variable if available)
const PORT = process.env.PORT || 5050;

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());

app.use('/api/ats',atsRoute);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World! 🌍');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
