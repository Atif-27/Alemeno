// src/features/courses/courseSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Course, Enrollment } from "../types/courseType";
import { toast } from "react-toastify";
import axiosInstance from "../helper/axiosInstance";

interface CourseState {
  courses: Course[];
  enrolledCourses: Enrollment[];
  selectedCourse: Course | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  enrolledCourses: [],
  selectedCourse: null,
  status: "idle",
  error: null,
};

//! Fetch All Courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get("http://localhost:8080/api/courses");
    return response.data as Course[];
  }
);

//! Fetch Course By ID
export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (id: string) => {
    const response = await axios.get(`http://localhost:8080/api/courses/${id}`);
    return response.data as Course;
  }
);

//! Fetching enrolled courses with course data and progress
export const fetchEnrolledCourses = createAsyncThunk(
  "courses/fetchEnrolledCourses",
  async () => {
    const response = await axiosInstance.get("/enrollments/my-courses");
    return response.data as Enrollment[];
  }
);

// ! Enroll in a course
export const enrollInCourse = createAsyncThunk(
  "courses/enrollInCourse",
  async (courseId: string) => {
    const response = await axiosInstance.post("/enrollments/enroll", {
      courseId,
    });

    return response.data as Enrollment;
  }
);

// !Update Progress
export const updateProgress = createAsyncThunk(
  "courses/updateProgress",
  async ({
    courseId,
    week,
    completed,
  }: {
    courseId: string;
    week: number;
    completed: boolean;
  }) => {
    await axiosInstance.patch(`/enrollments/progress`, {
      courseId,
      week,
      completed,
    });
    return {
      courseId,
      week,
      completed,
    };
  }
);

// ! Mark all weeks as completed
export const markAllAsCompleted = createAsyncThunk(
  "courses/markAllAsCompleted",
  async (courseId: string) => {
    await axiosInstance.patch(`/enrollments/${courseId}/complete-all`);
    return courseId;
  }
);

// * Course Slice
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        toast.error(action.error.message || "Failed to fetch courses");
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch courses";
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.error.message || "Failed to fetch course details");

        state.error = action.error.message || "Failed to fetch course details";
      })
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.enrolledCourses = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.error.message || "Failed to fetch enrolled courses");

        state.error =
          action.error.message || "Failed to fetch enrolled courses";
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        toast.success("Enrolled successfully");
        state.enrolledCourses = [...state.enrolledCourses, action.payload];
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        toast.error(action.error.message || "Failed to enroll in course");
        console.log(action.error);

        state.error = action.error.message || "Failed to enroll in course";
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        const { courseId, week, completed } = action.payload;
        const enrollment = state.enrolledCourses.find(
          (course) => course.course._id === courseId
        );

        if (enrollment) {
          const item = enrollment.progress.find((p) => p.week === week);
          if (item) {
            item.completed = completed;
          }
        }
      })
      .addCase(markAllAsCompleted.fulfilled, (state, action) => {
        const courseId = action.payload;
        const enrollment = state.enrolledCourses.find(
          (enrolled) => enrolled.course._id === courseId
        );

        if (enrollment) {
          enrollment.progress.forEach((course) => (course.completed = true));
        }
      });
  },
});

export default courseSlice.reducer;
