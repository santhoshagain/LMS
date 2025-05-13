const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },  // Unique ID for each course
  courseName: { type: String, required: true },  // Name of the course
  courseDetails: { type: String, required: true },  // Detailed description of the course
  courseDuration: { type: String, required: true },  // Duration of the course (e.g., 4 weeks, 6 months)
  courseCost: { type: Number, required: true },  // Cost of the course
  courseImg: { type: String, required: true },  // URL of the course image
  studentsRegistered: { type: Number, default: 0 },  // Tracks the number of students registered
  totalRevenue: { type: Number, default: 0 },  // Total revenue generated from the course
  videoDetails: [
    {
      title: { type: String, required: true },  // Video title
      link: { type: String, required: true },   // Video link (e.g., YouTube or other platforms)
    },
  ],
});

module.exports = mongoose.model('Course', courseSchema);
