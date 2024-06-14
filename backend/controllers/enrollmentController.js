const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const User = require("../models/User");

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