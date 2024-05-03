// controllers/courseController.js
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

exports.createCourse = async (req, res) => {
  const {
    name,
    instructor,
    description,
    enrollmentStatus,
    duration,
    schedule,
    location,
    prerequisites,
    syllabus,
  } = req.body;
  try {
    const course = new Course({
      name,
      instructor,
      description,
      enrollmentStatus,
      duration,
      schedule,
      location,
      prerequisites,
      syllabus,
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const updates = req.body;
  try {
    const course = await Course.findByIdAndUpdate(courseId, updates, {
      new: true,
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    await Course.findByIdAndDelete(courseId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
