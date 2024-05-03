// models/Course.js
const mongoose = require("mongoose");
const instructorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  title: String,
  avatar: String,
});
const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructor: instructorSchema,
    description: String,
    price: Number,
    enrollmentStatus: { type: String, enum: ["Open", "Closed", "In Progress"] },
    thumbnail: String,
    duration: String,
    schedule: String,
    location: String,
    prerequisites: [String],
    syllabus: [
      {
        week: Number,
        topic: String,
        content: String,
      },
    ],
    students: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", CourseSchema);
