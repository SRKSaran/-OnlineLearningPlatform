const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const enrollmentController = require('../controllers/enrollmentController');
const admin = require('../middleware/admin');

router.post('/createEnrollment', auth, enrollmentController.createEnrollment);

router.get('/getAllEnrollments', auth, admin, enrollmentController.getAllEnrollments);

router.get('/getPendingEnrollments', auth, admin, enrollmentController.getPendingEnrollments);

router.put('/acceptEnrollment/:enrollmentId', auth, admin, enrollmentController.acceptEnrollment);

router.put('/rejectEnrollment/:enrollmentId', auth, admin, enrollmentController.rejectEnrollment);

router.delete('/deleteEnrollment/:enrollmentId', auth, admin, enrollmentController.deleteEnrollment);

module.exports = router;
