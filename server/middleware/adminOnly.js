const authenticate = require('./authenticate'); // Ensure this file is required if it's used across the app.

const adminOnly = (req, res, next) => {
  // Check if user role is defined
  if (!req.role) {
    return res.status(403).json({ message: 'Access denied. User role is missing.' });
  }

  // Check if user role is 'admin'
  if (req.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  // Proceed if user is an admin
  next();
};

module.exports = adminOnly;
