import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import courseReducer from "./course";
const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
  },
});

export default store;
