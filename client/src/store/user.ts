import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userDetailType } from "../types/userType";

interface User {
  userDetail: userDetailType | null;
  isAuthenticated: boolean;
}

const initialState: User = JSON.parse(
  localStorage.getItem("user") as string
) || {
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<userDetailType>) => {
      state.userDetail = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.userDetail = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
