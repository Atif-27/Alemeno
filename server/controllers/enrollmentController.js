// controllers/enrollmentController.js
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

//! Enroll in a course
exports.enrollCourse = async (req, res) => {
  const { courseId } = req.body;
  const studentId = req.user._id; // Get the user ID from the request object

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (course.enrollmentStatus === "Closed") {
      return res.status(400).json({ message: "Enrollment is closed" });
    }
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });
    if (existingEnrollment) {
      return res.status(400).json({ message: "Already enrolled" });
    }
    const progress = course.syllabus.map((syllabusItem) => ({
      week: syllabusItem.week,
      completed: false,
    }));

    const enrollment = new Enrollment({
      student: studentId,
      course: courseId,
      progress,
    });
    await enrollment.save();
    // Update student count in the course document
    await Course.findByIdAndUpdate(courseId, {
      $inc: { students: 1 },
    });

    const populatedEnrollment = await Enrollment.findById(
      enrollment._id
    ).populate("course");
    res.status(201).json({
      progress: populatedEnrollment.progress,
      course: populatedEnrollment.course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//! Get all enrolled courses
exports.getAllEnrolledCourses = async (req, res) => {
  const studentId = req.user._id;

  try {
    const enrollments = await Enrollment.find({ student: studentId }).populate(
      "course"
    );
    const courses = enrollments.map((enrollment) => {
      return {
        course: enrollment.course,
        progress: enrollment.progress,
      };
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ! Update progress
exports.updateProgress = async (req, res) => {
  const { courseId, week, completed } = req.body;
  try {
    const enrollment = await Enrollment.findOne({
      course: courseId,
      student: req.user._id,
    });
    const progressItem = enrollment.progress.find((p) => p.week === week);
    if (progressItem) {
      progressItem.completed = completed;
    }
    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ! Mark all progress as completed
exports.markAllAsCompleted = async (req, res) => {
  const { courseId } = req.params; // Get enrollment ID from URL parameters

  try {
    const enrollment = await Enrollment.findOne({
      course: courseId,
      student: req.user._id,
    });
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Update all progress items to completed
    enrollment.progress = enrollment.progress.map((item) => ({
      ...item,
      completed: true,
    }));
    await enrollment.save();

    res.json({ message: "All items marked as completed", enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
