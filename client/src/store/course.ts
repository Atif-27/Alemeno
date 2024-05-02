import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Course {
  id: number;
  name: string;
  likes: number;
}

interface CourseState {
  courses: Course[];
  courseDetail: Course | null;
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
    const response = await axios.get("http://your-api-url/courses");
    return response.data as Course[];
  }
);

// Async thunk for fetching a course by ID
export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (courseId: number) => {
    const response = await axios.get(`http://your-api-url/courses/${courseId}`);
    return response.data as Course;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
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
    toggleEnrollment: (state, action: PayloadAction<number>) => {
      const index = state.enrolledCourses.indexOf(action.payload);
      if (index === -1) {
        state.enrolledCourses.push(action.payload);
      } else {
        state.enrolledCourses.splice(index, 1);
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

export const { toggleLikeCourse, toggleEnrollment } = courseSlice.actions;
export default courseSlice.reducer;
