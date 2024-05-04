// src/features/courses/courseSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Course, Enrollment } from "../types/courseType";

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
    const response = await axios.get(
      "http://localhost:8080/api/enrollments/my-courses",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjM0ZmM0YTlkOTNkMWJmODI2MjY2MjIiLCJpYXQiOjE3MTQ4MDM2NjMsImV4cCI6MTcxNDg5MDA2M30.O2cOLVRIED_td7tdd-JqFiMY2KPticeQA5P3NfTg8ao`,
        },
      }
    );
    return response.data as Enrollment[];
  }
);

// ! Enroll in a course
export const enrollInCourse = createAsyncThunk(
  "courses/enrollInCourse",
  async (courseId: string) => {
    const response = await axios.post(
      "http://localhost:8080/api/enrollments/enroll",
      {
        courseId,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjM0ZmM0YTlkOTNkMWJmODI2MjY2MjIiLCJpYXQiOjE3MTQ4MDM2NjMsImV4cCI6MTcxNDg5MDA2M30.O2cOLVRIED_td7tdd-JqFiMY2KPticeQA5P3NfTg8ao`,
        },
      }
    );

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
    await axios.patch(
      `http://localhost:8080/api/enrollments/progress`,
      {
        courseId,
        week,
        completed,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjM0ZmM0YTlkOTNkMWJmODI2MjY2MjIiLCJpYXQiOjE3MTQ4MDM2NjMsImV4cCI6MTcxNDg5MDA2M30.O2cOLVRIED_td7tdd-JqFiMY2KPticeQA5P3NfTg8ao`,
        },
      }
    );
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
    await axios.patch(
      `http://localhost:8080/api/enrollments/${courseId}/complete-all`,
      {},
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjM0ZmM0YTlkOTNkMWJmODI2MjY2MjIiLCJpYXQiOjE3MTQ4MDM2NjMsImV4cCI6MTcxNDg5MDA2M30.O2cOLVRIED_td7tdd-JqFiMY2KPticeQA5P3NfTg8ao`,
        },
      }
    );
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
        state.error =
          action.error.message || "Failed to fetch enrolled courses";
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.enrolledCourses = [...state.enrolledCourses, action.payload];
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        const { courseId, week, completed } = action.payload;
        const enrollment = state.enrolledCourses.find(
          (course) => course.course._id === courseId
        );
        console.log(enrollment);

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
        console.log(enrollment);

        if (enrollment) {
          enrollment.progress.forEach((course) => (course.completed = true));
        }
      });
  },
});

export default courseSlice.reducer;
