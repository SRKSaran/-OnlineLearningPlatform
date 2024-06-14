const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const enrollmentController = require('../controllers/enrollmentController');

// POST /api/enrollments/create
router.post('/createEnrollment', auth, enrollmentController.createEnrollment);

// GET /api/enrollments
router.get('/getAllEnrollments', auth, enrollmentController.getAllEnrollments);

router.get('/getAllEnrolledCourseById/:userId', auth, enrollmentController.getAllEnrolledCourseById);

// PUT /api/enrollments/:enrollmentId
router.put('/updateEnrollment/:enrollmentId', auth, enrollmentController.updateEnrollment);

// DELETE /api/enrollments/:enrollmentId
router.delete('/deleteEnrollment/:enrollmentId', auth, enrollmentController.deleteEnrollment);

module.exports = router;
