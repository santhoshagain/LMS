const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4
const User = require('../models/User');  // User model
const config = require('../config');    // JWT secret from config file
const mongoose = require('mongoose');   // Import mongoose

// Register handler
const registerHandler = async (req, res) => {
  const { name, email, password, phoneNumber, photo, role } = req.body;

  // Validate input
  if (!name || !email || !password || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      photo: photo || '',
      role: role || 'student',  // Default role is 'student'
      totalCoursesRegistered: 0,  // Default course count
      totalSpent: 0,  // Default amount spent
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login handler
const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the user is already logged in
    if (user.activeSessionToken) {
      return res.status(400).json({ message: 'Session already active. Please logout from other devices to login here.' });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: '1h' });

    // Generate session token
    const sessionToken = uuidv4();

    // Store session token in the database
    user.activeSessionToken = sessionToken;
    await user.save();

    // Set token as HttpOnly cookie (Security)
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      expires: new Date(Date.now() + 3600000), // 1 hour expiration
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id.toString(),
      role: user.role, // Send role to client
      sessionToken, // Send session token to client
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout handler
const logoutHandler = async (req, res) => {
  try {
    // Retrieve user ID from the request body
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    // Find the user and clear the activeSessionToken
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.activeSessionToken = null; // Clear the session token
    await user.save(); // Save the user document

    // Clear cookies
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

// Force logout handler
const forceLogoutHandler = async (req, res) => {
  const { email } = req.body;

  // Validate input
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clear the activeSessionToken
    user.activeSessionToken = null;
    await user.save();

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Force logout error:', error);
    res.status(500).json({ message: 'Server error during force logout' });
  }
};

module.exports = { registerHandler, loginHandler, logoutHandler, forceLogoutHandler };
