const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/createCourse', auth, admin, courseController.createCourse);

router.get('/getCourses', auth, admin, courseController.getCourses);

router.get('/getCourseById/:id', admin, auth, courseController.getCourseById);

router.put('/updateCourse/:id', auth, admin, courseController.updateCourse);

router.delete('/deleteCourse/:id', auth, admin, courseController.deleteCourse);

module.exports = router;
