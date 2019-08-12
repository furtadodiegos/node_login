/**
 * Dependencies
 */
const { app } = require('../app');

const PORT = process.env.PORT || 5000;

// Listening the app
app.listen(PORT, () => console.log(`Api running on port: ${PORT}`));
