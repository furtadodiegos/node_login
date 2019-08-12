/**
 * Dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

/**
 * Express App
 */
const app = express();

/**
 * Configs
 */
require('./configs/environments');
require('./configs/mongo');

/**
 * Middlewares
 */

// Will be print on console :method :url :status :response-time ms - :res[content-length]
app.use(logger(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));

// Handle the req.body to be a valid JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle access on app
app.use(cors());

// helps on security of app
app.use(helmet());

// Assign all routes
require('./configs/routes')(app);

// Handle errors
require('./middleware/handleError')(app);

module.exports = { app };
