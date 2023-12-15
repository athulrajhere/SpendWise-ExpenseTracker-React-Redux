import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import incomeReducer from "../features/income/incomeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    income: incomeReducer,
  },
});
