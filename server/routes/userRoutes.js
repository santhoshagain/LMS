const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import the userController

// Protect routes with authentication middleware
const authenticate = require('../middleware/authenticate');

const adminOnly = require('../middleware/adminonly');

// Get authenticated user's profile
router.get('/profile', authenticate, userController.getProfile);

// Get authenticated user's purchased courses
router.get('/purchasedcourses', authenticate, userController.getPurchasedCourses);

// Admin Routes

// Get all users (admin only)
router.get('/', authenticate, adminOnly, userController.getAllUsers);

// View details of a single user (admin only)
router.get('/:userId', authenticate, adminOnly, userController.getUserDetails);

// Edit user details (admin only)
router.put('/:userId', authenticate, adminOnly, userController.editUserDetails);

// Delete user (admin only)
router.delete('/:userId', authenticate, adminOnly, userController.deleteUser);

module.exports = router;
