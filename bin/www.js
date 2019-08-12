/**
 * Dependencies
 */
const http = require('http');
const { app } = require('../app');

const PORT = process.env.PORT || 5000;

// Start HTTP server
const server = http.createServer(app);

// Listening the app
server.listen(PORT, () => console.log(`Api running on port: ${PORT}`));
