import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CourseType } from "../types/courseType";
interface CourseState {
  courses: CourseType[];
  courseDetail: CourseType | null;
  likedCourses: number[];
  enrolledCourses: number[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CourseState = {
  courses: JSON.parse(localStorage.getItem("courses") || "[]"),
  courseDetail: null,
  likedCourses: JSON.parse(localStorage.getItem("likedCourses") || "[]"),
  enrolledCourses: JSON.parse(localStorage.getItem("enrolledCourses") || "[]"),
  status: "idle",
  error: null,
};

// Async thunk for fetching all courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get("http://localhost:8000/courses");
    return response.data as CourseType[];
  }
);

// Async thunk for fetching a course by ID
export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (courseId: number) => {
    const response = await axios.get(
      `http://localhost:8000/courses?id=${courseId}`
    );
    return response.data[0] as CourseType;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearCourses: (state) => {
      state.courses = [];
    },
    toggleLikeCourse: (state, action: PayloadAction<number>) => {
      const index = state.likedCourses.indexOf(action.payload);
      if (index === -1) {
        state.likedCourses.push(action.payload);
      } else {
        state.likedCourses.splice(index, 1);
      }
      if (state.courseDetail?.id === action.payload) {
        state.courseDetail.likes += index === -1 ? 1 : -1;
      }
      localStorage.setItem("likedCourses", JSON.stringify(state.likedCourses));
    },
    enrollCourse: (state, action: PayloadAction<number>) => {
      const index = state.enrolledCourses.indexOf(action.payload);
      if (index === -1) {
        state.enrolledCourses.push(action.payload);
      }
      localStorage.setItem(
        "enrolledCourses",
        JSON.stringify(state.enrolledCourses)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
        localStorage.setItem("courses", JSON.stringify(state.courses));
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.courseDetail = action.payload;
      });
  },
});

export const { toggleLikeCourse, enrollCourse, clearCourses } =
  courseSlice.actions;
export default courseSlice.reducer;
