const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const User = require("../models/User");

// Create Enrollment
exports.createEnrollment = async (req, res) => {
  const { studentId, courseId, status } = req.body;

  try {
    const enrollment = new Enrollment({
      student: studentId,
      course: courseId,
      status: status,
    });
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get All Enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ status: "enrolled" })
      .populate("student")
      .populate("course");

    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getPendingEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ status: "pending" })
      .populate("student")
      .populate("course");

    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.acceptEnrollment = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ msg: "Enrollment not found" });
    }

    enrollment.status = "enrolled";
    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.rejectEnrollment = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ msg: "Enrollment not found" });
    }

    enrollment.status = "rejected";
    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete Enrollment
exports.deleteEnrollment = async (req, res) => {
  const { enrollmentId } = req.params;

  try {
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ msg: "Enrollment not found" });
    }

    await Enrollment.deleteOne({ _id: enrollmentId });
    res.json({ msg: "Enrollment removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get Enrollment by userId
exports.getAllPendingCourseById = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find enrollments by student (userId)
    const enrolledCourses = await Enrollment.find({ student: userId, status: { $in: ["pending", "enrolled"] }});

    // Map the enrollments to get the course IDs
    const enrolledCourseIds = enrolledCourses.map((enrollment) =>
      enrollment.course.toString()
    );

    const allCourses = await Course.find();

    // Filter out the courses that are not enrolled by the user
    const unmatchedCourses = allCourses.filter(
      (course) => !enrolledCourseIds.includes(course._id.toString())
    );

    res.json(unmatchedCourses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getAllEnrolledCourseById = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find enrollments by student (userId)
    const enrolledCourses = await Enrollment.find({ student: userId, status: "enrolled"});

    // Map the enrollments to get the course IDs
    const enrolledCourseIds = enrolledCourses.map((enrollment) =>
      enrollment.course.toString()
    );

    const allCourses = await Course.find();

    // Filter out the courses that are not enrolled by the user
    const matchedCourses = allCourses.filter(
      (course) => enrolledCourseIds.includes(course._id.toString())
    );

    res.json(matchedCourses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};