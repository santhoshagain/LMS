const jwt = require('jsonwebtoken');
const config = require('../config'); // JWT secret from config file

// Middleware for JWT authentication
const authenticate = (req, res, next) => {
  const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1]; // Get token from cookie or header
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Verify the JWT token using secret from config
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Ensure the token contains necessary information (userId and role)
    if (!decoded || !decoded.userId || !decoded.role) {
      return res.status(401).json({ message: 'Invalid token payload. Missing required fields.' });
    }

    // Attach user information to the request object
    req.userId = decoded.userId; // No need to convert to string unless necessary
    req.role = decoded.role;

    // Ensure the token has not expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp < currentTime) {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }

    // Optional: Check token freshness, e.g., not too old (like issuing a new token if it's nearing expiry)

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticate;
