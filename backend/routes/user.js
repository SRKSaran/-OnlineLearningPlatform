const { body } = require('express-validator');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', auth, userController.logout);


router.post('/createStudent', auth, admin, userController.createStudent);

router.get('/getAllStudents', auth, admin, userController.getAllStudents);

router.put('/updateStudent/:id', auth, admin, userController.updateStudentById);

router.delete('/deleteStudent/:id', auth, admin, userController.deleteStudentById);

module.exports = router;
