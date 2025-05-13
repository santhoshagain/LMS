require('dotenv').config();

module.exports = {
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://:lms.kjnnq.mongodb.net/?retryWrites=true&w=majority&appName=LMS', 
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  PORT: process.env.PORT || 5000
};
