// controllers/courseController.js
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

// Create a new course and save it to the database
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

// Retrieve all courses from the database
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Retrieve a course by its ID from the database
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

// Update a course by its ID in the database
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

// Delete a course by its ID from the database
exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    await Course.findByIdAndDelete(courseId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
