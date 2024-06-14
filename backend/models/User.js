const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone:  String,
  address: String,
  dateOfBirth: Date,
  password: { type: String, required: true },
  role: { type: String, default: "student" }, // 'student' or 'admin'
});

module.exports = mongoose.model("user", userSchema);
