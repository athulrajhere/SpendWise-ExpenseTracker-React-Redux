const asyncHandler = require("express-async-handler");
const ExpenseCategorySchema = require("../models/ExpenseCategoryModel");
const UserSchema = require("../models/UserModel");
const CustomError = require("../utils/CustomError");

exports.addExpenseCategory = asyncHandler(async (req, res) => {
  const { title, icon, color, isIncome } = req.body;

  const expenseCategory = ExpenseCategorySchema({
    user: req.user.id,
    title,
    icon,
    color,
    isIncome,
  });

  if (!title || !icon || !color) {
    throw new CustomError("Please fill all fields", 400);
  }

  const newExpense = await expenseCategory.save();
  res.status(200).json({ message: "New expense category added successfully" });
});

exports.getExpenseCategories = asyncHandler(async (req, res) => {
  const expenses = await ExpenseCategorySchema.find({ user: req.user.id }).sort(
    {
      createdAt: -1,
    }
  );
  res
    .status(200)
    .json({ data: expenses, message: "Expense category loaded successfully" });
});

exports.updateExpenseCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, icon, color, isIncome } = req.body;

  if (!title || !amount || !icon || !color) {
    throw new CustomError("Please fill all fields", 400);
  }

  const expenseCategory = await ExpenseCategorySchema.findById(id);

  if (!expenseCategory) {
    throw new CustomError("Expense category not found", 400);
  }

  if (!req.user) {
    throw new CustomError("User not found", 401);
  }

  if (expenseCategory.user.toString() !== req.user.id) {
    throw new CustomError("Unauthorized", 401);
  }
  const updatedExpenseCategory = await ExpenseCategorySchema.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    data: updatedExpenseCategory,
    message: "Expense category updated successfully",
  });
});

exports.deleteExpenseCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const expenseCategory = await ExpenseCategorySchema.findById(id);

  if (!expenseCategory) {
    throw new CustomError("Expense category not found", 400);
  }

  if (!req.user) {
    throw new CustomError("User not found", 401);
  }

  if (expenseCategory.user.toString() !== req.user.id) {
    throw new CustomError("User not authorized", 401);
  }

  ExpenseCategorySchema.findByIdAndDelete(id)
    .then((category) => {
      res
        .status(200)
        .json({ id: id, message: "Expense category deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
});
