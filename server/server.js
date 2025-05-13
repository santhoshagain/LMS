const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const config = require('./config/config');
const connectDB = require('./config/db');
const middleware = require('./middleware/middleware');

// Import Routes


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Apply middleware
app.use(middleware.bodyParser);
app.use(middleware.cookieParser);
app.use(middleware.helmet);
app.use(middleware.rateLimit);
app.use(middleware.xss);
app.use(middleware.mongoSanitize);
app.use(middleware.cors);

// Register Routes


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Static file route for uploads
app.use('/api/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Fallback Route for 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
