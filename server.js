// Import the express module
const express = require('express');
const dotenv = require('dotenv')

// Create an instance of express
const app = express();
dotenv.config();

// Set the port (use environment variable if available)
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World! 🌍');
});

// Example API route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
