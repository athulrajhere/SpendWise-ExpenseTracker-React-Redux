import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import incomeService from "./incomeService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  income: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createIncome = createAsyncThunk(
  "income/create",
  async (incomeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(incomeData);
      return await incomeService.createIncome(incomeData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getIncomes = createAsyncThunk(
  "income/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await incomeService.getIncomes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    reset: (state) => {
      initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.income.push(action.payload);
      })
      .addCase(createIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getIncomes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncomes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.income = action.payload;
      })
      .addCase(getIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = incomeSlice.actions;
export default incomeSlice.reducer;
