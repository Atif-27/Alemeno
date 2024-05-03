// models/Enrollment.js
const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  progress: [
    {
      week: Number,
      completed: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
