const mongoose = require("mongoose");
const ExpenseCategoryModel = require("./ExpenseCategoryModel");
const Category = require("./CatagoriesModel");
const { TYPES } = require("../libs/constants");

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, "Title must be below 50 characters"],
    },
    amount: {
      type: Number,
      required: true,
      min: [-9999999, "Amount must be above 0"],
      max: [9999999, "Please enter a lesser amount"],
      trim: true,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    periodBalance: {
      type: Number,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    description: {
      type: String,
      required: true,
      maxLength: [50, "Description must be below 50 characters"],
      trim: true,
    },
    isIncome: {
      type: Boolean,
    },
    type: {
      type: String,
      enum: TYPES,
      default: TYPES.EXPENSE,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
