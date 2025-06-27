import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { register as registerUser, login as loginUser, logout as logoutUser } from "./authService"; // Adjust the path if necessary
import { toast } from "react-toastify";
import { User } from "./types";

interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

const initialState: AuthState = {
  user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: any, thunkAPI) => {
    try {
      return await registerUser(user);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || error.toString());
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: any, thunkAPI) => {
    try {
      return await loginUser(user);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || error.toString());
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (userId: any, thunkAPI) => {
    try {
      await logoutUser(userId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || error.toString());
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
