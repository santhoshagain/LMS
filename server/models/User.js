const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Remove custom userId
  name: { type: String, required: true },  // User's name
  email: { type: String, required: true, unique: true },  // User's email
  password: { type: String, required: true },  // User's password
  phoneNumber: { type: String, required: true },  // User's phone number
  photo: { type: String },  // User's photo URL (optional)
  totalSpent: { type: Number, default: 0 },  // Total amount spent on all courses
  role: { 
    type: String, 
    enum: ['student', 'teacher', 'admin'],  // Roles: student, teacher, admin
    default: 'student'  // Default role is student
  },
  purchasedCourses: [{ type: String }], // Array of course IDs (as strings)
  activeSessionToken: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('User', userSchema);
