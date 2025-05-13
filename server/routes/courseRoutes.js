const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authenticate = require('../middleware/authenticate');
const adminOnly = require('../middleware/adminonly');

// Get all courses
router.get('/view', courseController.getAllCourses);

// Add a new course (admin only)
router.post('/add', authenticate, adminOnly, courseController.upload.single('courseImg'), courseController.addCourse);

// Get a single course by ID
router.get('/:courseId', courseController.getCourseById);

router.put("/:courseId", courseController.updateCourseVideos);

// Update course details (admin only)
router.put('/:id', authenticate, adminOnly, courseController.editCourse);  // Use :id instead of :courseId

// Purchase course route
router.post('/purchase/:courseId', authenticate, courseController.purchaseCourse);

router.delete('/:courseId', authenticate, adminOnly, courseController.deleteCourse);

// Add videos to a course (admin only)
router.post('/:courseId/videos', authenticate, adminOnly, courseController.addVideosToCourse);

module.exports = router;
