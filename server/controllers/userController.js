const User = require('../models/User');
const Course = require('../models/Course');
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');
const adminOnly = require('../middleware/adminonly');


// Get authenticated user's profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photo: user.photo,
      totalSpent: user.totalSpent,
      role: user.role,
      purchasedCourses: user.purchasedCourses,
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// API endpoint to get purchased courses with full details
const getPurchasedCourses = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate('purchasedCourses');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const purchasedCourses = user.purchasedCourses;

    if (purchasedCourses.length === 0) {
      return res.status(404).json({ message: 'No purchased courses found' });
    }

    res.status(200).json({ courses: purchasedCourses });
  } catch (error) {
    console.error('Error fetching purchased courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      if (!users.length) {
        return res.status(404).json({ message: 'No users found.' });
      }
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Failed to fetch users. Please try again later.' });
    }
  };
  
  // Get details of a single user (admin only)
  const getUserDetails = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Failed to fetch user details. Please try again later.' });
    }
  };
  
  // Edit user details (admin only)
  const editUserDetails = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json({ message: 'User updated successfully.', user });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user. Please try again later.' });
    }
  };
  
  // Delete user (admin only)
  const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Failed to delete user. Please try again later.' });
    }
  };



module.exports = {
  getProfile,
  getPurchasedCourses,
  getAllUsers,
  getUserDetails,
  editUserDetails,
  deleteUser,
};
