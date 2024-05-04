// routes/enrollmentRoutes.js
const express = require("express");
const router = express.Router();
const {
  enrollCourse,
  updateProgress,
} = require("../controllers/enrollmentController");
const authMiddleware = require("../middleware/authMiddleware");
const { markAllAsCompleted } = require("../controllers/enrollmentController");
const {
  getAllEnrolledCourses,
} = require("../controllers/enrollmentController");

router.post("/enroll", authMiddleware, enrollCourse);
router.patch("/progress", authMiddleware, updateProgress);
router.patch("/:courseId/complete-all", authMiddleware, markAllAsCompleted);
router.get("/my-courses", authMiddleware, getAllEnrolledCourses);

module.exports = router;
