import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import transactionService from "./transactionService";
import { 
  TransactionState, 
  CreateTransactionData, 
  UpdateTransactionData, 
  DeleteTransactionData,
  GetTransactionsData,
  TransactionResponse,
  TransactionsResponse,
  DeleteTransactionResponse,
  DeleteTransactionsSelectedResponse
} from "./types";
import { RootState } from "../../app/store";

const initialState: TransactionState = {
  transaction: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFetching: false,
  isCreating: false,
  isDeleting: false,
  isUpdating: false,
  message: "",
};

export const createTransaction = createAsyncThunk<TransactionResponse, CreateTransactionData>(
  "transaction/create",
  async (transactionData, thunkAPI) => {
    try {
      return await transactionService.createTransaction(transactionData);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        let errors: Record<string, string> = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        return thunkAPI.rejectWithValue(error);
      }

      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTransactions = createAsyncThunk<TransactionsResponse, GetTransactionsData>(
  "transaction/getAll",
  async (data, thunkAPI) => {
    try {
      return await transactionService.getTransactions(
        data.startDate,
        data.endDate
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTransaction = createAsyncThunk<DeleteTransactionResponse, DeleteTransactionData>(
  "transaction/delete",
  async (data, thunkAPI) => {
    try {
      return await transactionService.deleteTransaction(data);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTransaction = createAsyncThunk<TransactionResponse, UpdateTransactionData>(
  "transaction/update",
  async (data, thunkAPI) => {
    try {
      return await transactionService.updateTransaction(
        data.id,
        data.transactionUpdateData
      );
    } catch (error: any) {
      if (error.name === "ValidationError") {
        let errors: Record<string, string> = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        return thunkAPI.rejectWithValue(error);
      }
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTransactionsSelected = createAsyncThunk<DeleteTransactionsSelectedResponse, string[]>(
  "transaction/deleteSelected",
  async (transactionSelectedIds, thunkAPI) => {
    try {
      return await transactionService.deleteTransactionsSelected(
        transactionSelectedIds
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    transactionReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isCreating = false;
        state.isSuccess = true;
        state.transaction.push(action.payload.data);
        state.message = action.payload.message;
        toast.success(state.message);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isCreating = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(state.message);
      })
      .addCase(getTransactions.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.transaction = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(state.message);
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.isSuccess = true;
        const isSingleDeletion = action.payload.id !== undefined;
        const deletedIds = isSingleDeletion
          ? [action.payload.id!]
          : action.payload.ids || [];
        state.transaction = state.transaction.filter(
          (transaction) => !deletedIds.includes(transaction._id)
        );
        state.message = action.payload.message;
        toast.success(state.message);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isDeleting = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(state.message);
      })
      .addCase(deleteTransactionsSelected.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteTransactionsSelected.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.isSuccess = true;
        state.transaction = state.transaction.filter(
          (transaction) => !action.payload.ids.includes(transaction._id)
        );
        state.message = action.payload.message;
        toast.success(state.message);
      })
      .addCase(deleteTransactionsSelected.rejected, (state, action) => {
        state.isDeleting = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(state.message);
      })
      .addCase(updateTransaction.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.isSuccess = true;
        state.transaction = state.transaction.map((transaction) =>
          transaction._id === action.payload.data._id
            ? action.payload.data
            : transaction
        );
        state.message = action.payload.message;
        toast.success(state.message);
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(state.message);
      });
  },
});

export const { transactionReset } = transactionSlice.actions;
export default transactionSlice.reducer; 