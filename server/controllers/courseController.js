const Course = require('../models/Course');
const User = require('../models/User');
const multer = require('multer');
const mongoose = require('mongoose');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const courseId = req.body.courseId;
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${courseId}.${fileExtension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (courses.length === 0) {
      return res.status(404).json({ message: 'No courses available.' });
    }
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Failed to fetch courses.' });
  }
};

// Add a new course (admin only)
const addCourse = async (req, res) => {
  const { courseId, courseName, courseDetails, courseDuration, courseCost } = req.body;
  const courseImg = req.file ? req.file.path : '';

  if (!courseId || !courseName || !courseDetails || !courseDuration || !courseCost || !courseImg) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingCourse = await Course.findOne({ courseId });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course ID already exists.' });
    }

    const newCourse = new Course({
      courseId,
      courseName,
      courseDetails,
      courseDuration,
      courseCost,
      courseImg,
      studentsRegistered: 0,
      totalRevenue: 0,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully.', course: newCourse });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Failed to add course.' });
  }
};

// Get a single course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({ courseId: req.params.courseId });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Failed to fetch course.' });
  }
};

// Purchase course route
const purchaseCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.userId;
  const { paymentAmount } = req.body;

  if (!paymentAmount || isNaN(paymentAmount) || paymentAmount <= 0) {
    return res.status(400).json({ message: 'Invalid payment amount.' });
  }

  try {
    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.purchasedCourses.includes(courseId)) {
      return res.status(400).json({ message: 'You have already purchased this course.' });
    }

    user.purchasedCourses.push(courseId);
    user.totalSpent += paymentAmount;

    course.studentsRegistered += 1;
    course.totalRevenue += paymentAmount;

    await user.save();
    await course.save();

    res.status(200).json({ message: 'Payment successful, course purchased.' });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Failed to complete the purchase.' });
  }
};

// Add videos to a course
const addVideosToCourse = async (req, res) => {
  const { courseId } = req.params;
  const { videos } = req.body;

  if (!Array.isArray(videos) || videos.length === 0) {
    return res.status(400).json({ message: "Invalid video data provided." });
  }

  try {
    const course = await Course.findOne({ courseId });  // Use courseId instead of _id
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    course.videoDetails = [...course.videoDetails, ...videos];  // Append new videos to existing array
    await course.save();

    res.status(200).json({ message: "Videos added successfully.", course });
  } catch (error) {
    console.error("Error adding videos:", error);
    res.status(500).json({ message: "Failed to add videos." });
  }
};

const editCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid course ID.' });
    }

    // Update the course
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });

    if (!course) {
      return res.status(404).send({ message: 'Course not found.' });
    }

    res.status(200).send({ message: 'Course updated successfully.', course });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).send({ message: 'Failed to update course. Please try again later.' });
  }
};


const deleteCourse = async (req, res) => {
  try {
    // Find the course by courseId
    const course = await Course.findOne({ courseId: req.params.courseId });
    if (!course) {
      return res.status(404).send({ message: 'Course not found.' });
    }

    // Delete the course
    await Course.findOneAndDelete({ courseId: req.params.courseId });

    // Send success response
    res.status(200).send({ message: 'Course deleted successfully.' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).send({ message: 'Failed to delete course. Please try again later.' });
  }
};

// Update video details of a course
const updateCourseVideos = async (req, res) => {
  try {
    const { videoDetails } = req.body;

    const course = await Course.findOneAndUpdate(
      { courseId: req.params.courseId },
      { videoDetails },
      { new: true }
    );

    if (!course) {
      return res.status(404).send("Course not found");
    }

    res.json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).send("Server error");
  }
};


module.exports = {
  getAllCourses,
  addCourse,
  getCourseById,
  purchaseCourse,
  editCourse,
  deleteCourse,
  addVideosToCourse,
  upload,
  updateCourseVideos,
};
