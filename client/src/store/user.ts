import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id?: number;
  name?: string;
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
    login: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.id = 0;
      state.name = "";
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
