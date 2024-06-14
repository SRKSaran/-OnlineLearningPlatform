const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  const { title, description, instructor, price } = req.body;
  const course = new Course({ title, description, instructor, price });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    res.json(course);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, instructor, price } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description, instructor, price },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).send('Course not found');
    }
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).send('Course not found');
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
