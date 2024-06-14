const { body } = require('express-validator');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', auth, userController.logout);

const validate = (method) => {
    switch (method) {
      case 'createStudent': {
        return [
          body('name', 'Name is required').trim().notEmpty(),
          body('email', 'Invalid email').isEmail(),
          body('phone', 'Phone number is required').trim().notEmpty(),
        ];
      }
      default:
        return []; // Default case, return empty array
    }
};

// Create a new student
router.post('/createStudent', auth, admin, validate('createStudent'), userController.createStudent);

// Get all students
router.get('/getAllStudents', auth, admin, userController.getAllStudents);

// Get a student by ID
router.get('/getStudentById/:id', auth, admin, userController.getStudentById);

// Update a student by ID
router.put('/updateStudent/:id', auth, admin, userController.updateStudentById);

// Delete a student by ID
router.delete('/deleteStudent/:id', auth, admin, userController.deleteStudentById);

module.exports = router;
