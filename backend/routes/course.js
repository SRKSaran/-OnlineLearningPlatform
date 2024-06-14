const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Create a new course (only accessible to admins)
router.post('/createCourse', auth, admin, courseController.createCourse);

// Get all courses (accessible to all authenticated users)
router.get('/getCourses', auth, courseController.getCourses);

// Get a single course by ID (accessible to all authenticated users)
router.get('/getCourseById/:id', admin, auth, courseController.getCourseById);

// Update a course by ID (only accessible to admins)
router.put('/updateCourse/:id', admin, auth, courseController.updateCourse);

// Delete a course by ID (only accessible to admins)
router.delete('/deleteCourse/:id', admin, auth, courseController.deleteCourse);

module.exports = router;
