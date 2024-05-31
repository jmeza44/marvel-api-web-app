const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist', 'marvel-api-web-app', 'browser')));

// Serve Angular's index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'marvel-api-web-app', 'browser', 'index.html'));
});

// Set MIME type for JavaScript files
app.get('*.js', (req, res, next) => {
  res.set('Content-Type', 'application/javascript');
  next();
});

// Start the server
const PORT = process.env.PORT || 4700;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
