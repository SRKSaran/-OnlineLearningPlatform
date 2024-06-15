const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const enrollmentController = require('../controllers/enrollmentController');
const admin = require('../middleware/admin');

// POST /api/enrollments/create
router.post('/createEnrollment', auth, enrollmentController.createEnrollment);

// GET /api/enrollments
router.get('/getAllEnrollments', auth, admin, enrollmentController.getAllEnrollments);

router.get('/getPendingEnrollments', auth, admin, enrollmentController.getPendingEnrollments);

router.get('/getAllPendingCourseById/:userId', auth, enrollmentController.getAllPendingCourseById);

router.get('/getAllEnrolledCourseById/:userId', auth, enrollmentController.getAllEnrolledCourseById);

router.put('/acceptEnrollment/:enrollmentId', auth, admin, enrollmentController.acceptEnrollment);

router.put('/rejectEnrollment/:enrollmentId', auth, admin, enrollmentController.rejectEnrollment);

// DELETE /api/enrollments/:enrollmentId
router.delete('/deleteEnrollment/:enrollmentId', auth, admin, enrollmentController.deleteEnrollment);

module.exports = router;
