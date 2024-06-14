const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register user as student or handle admin registration
exports.register = async (req, res) => {
    const { name, address, date, email, phone, password, role } = req.body;
  
    // Default role to 'student' if not specified
    const userRole = role || 'student';
  
    if (userRole === 'admin') {
      return res.status(400).send('Admins cannot register directly.');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, address, date, email, phone, password: hashedPassword, role: userRole });
  
    try {
      await user.save();
      res.send('User registered successfully');
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Email or password is wrong');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.header('Authorization', 'Bearer ' + token).send({  token, userId: user._id  });
};

exports.logout = async (req, res) => {
  res.header('Authorization', '').send('Logged out successfully');
};

exports.createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, address, date, email, phone, password } = req.body;
  
  try {
    const student = new User({ name, address, date, email, phone, password });
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find();
    res.json(students);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await User.findById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update a student by ID
exports.updateStudentById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, address, date, email, phone, password } = req.body;

  try {
    const student = await User.findByIdAndUpdate(id, 
      { name, email, phone, address, dateOfBirth },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete a student by ID
exports.deleteStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await User.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};