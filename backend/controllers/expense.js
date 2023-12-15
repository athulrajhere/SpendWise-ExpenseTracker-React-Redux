const asyncHandler = require("express-async-handler");
const ExpenseSchema = require("../models/ExpenseModel");
const UserSchema = require("../models/UserModel");

exports.addExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = ExpenseSchema({
    user: req.user.id,
    title,
    amount,
    category,
    description,
    date,
  });

  if (!title || !category || !description || !date) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  if (amount < 0 || !amount === "number") {
    res.status(400);
    throw new Error("Amount must be a positive number!");
  }
  const newExpense = await income.save();
  res.status(200).json({ message: "Expense Added" });
});

exports.getExpenses = asyncHandler(async (req, res) => {
  const incomes = await ExpenseSchema.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json(incomes);
});

exports.updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const income = await ExpenseSchema.findById(id);

  if (!income) {
    res.status(401);
    throw new Error("Expense not found");
  }

  const user = await UserSchema.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (income.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  ExpenseSchema.findByIdAndUpdate(id, req.body, { new: true })
    .then((income) => {
      res.status(200).json({ message: "Expense updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
});

exports.deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const income = await ExpenseSchema.findById(id);

  if (!income) {
    res.status(400);
    throw new Error("Expense not found");
  }

  const user = await UserSchema.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (income.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Expense deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
});
