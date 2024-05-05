import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userDetailType } from "../types/userType";
import axiosInstance from "../helper/axiosInstance";
import { AxiosError } from "axios";

// Define a type for the slice state
interface UserState {
  userDetail: userDetailType | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  userDetail: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("user"),
  loading: false,
  error: null,
};

// Async thunk actions
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/users/login", userData);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || "Something went wrong while Login";
        return rejectWithValue(message);
      }
    }
  }
);

export const logOut = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/users/logout");
      localStorage.removeItem("user");
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || "Something went wrong while Logout";
        return rejectWithValue(message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/users/register", userData);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong while creating Register";
        return rejectWithValue(message);
      }
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userDetail = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userDetail = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.userDetail = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
