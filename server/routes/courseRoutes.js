// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  updateCourse,
  getCourseById,
  deleteCourse,
} = require("../controllers/courseController");

router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/:courseId", getCourseById);

router.put("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);

module.exports = router;
