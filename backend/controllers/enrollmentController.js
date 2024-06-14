const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Create Enrollment
exports.createEnrollment = async (req, res) => {
  const { studentId, courseId, status } = req.body;

  try {
    const enrollment = new Enrollment({ student: studentId, course: courseId , status: status});
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Get All Enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('student course');
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Update Enrollment
exports.updateEnrollment = async (req, res) => {
  const { enrollmentId } = req.params;
  const { status } = req.body;

  try {
    let enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ msg: 'Enrollment not found' });
    }

    enrollment.status = status;
    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Delete Enrollment
exports.deleteEnrollment = async (req, res) => {
    const { enrollmentId } = req.params;
  
    try {
      const enrollment = await Enrollment.findById(enrollmentId);
      if (!enrollment) {
        return res.status(404).json({ msg: 'Enrollment not found' });
      }
  
      await Enrollment.deleteOne({ _id: enrollmentId });
      res.json({ msg: 'Enrollment removed' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };

  // Get Enrollment by userId
  exports.getAllEnrolledCourseById = async (req, res) => {
    const { userId } = req.params;
    console.log("userId", userId);
  
    try {
      // Find enrollments by student (userId)
      const enrolledCourses = await Enrollment.find({ student: userId });
  
      // Map the enrollments to get the course IDs
      const enrolledCourseIds = enrolledCourses.map(enrollment => enrollment.course.toString());
  
      const allCourses = await Course.find();
  
      // Filter out the courses that are not enrolled by the user
      const unmatchedCourses = allCourses.filter(course => !enrolledCourseIds.includes(course._id.toString()));
  
      res.json(unmatchedCourses);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };