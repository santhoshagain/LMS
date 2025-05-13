const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const config = require('../config/config');

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: 'Too many requests from this IP, please try again later.'
});

// CORS Configuration
const corsOptions = {
  origin: config.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

module.exports = {
  bodyParser: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
  ],
  cookieParser: cookieParser(),
  helmet: helmet(),
  rateLimit: limiter,
  xss: xss(),
  mongoSanitize: mongoSanitize(),
  cors: cors(corsOptions)
};
