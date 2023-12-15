const asyncHandler = require("express-async-handler");
const IncomeSchema = require("../models/IncomeModel");
const UserSchema = require("../models/UserModel");

exports.addIncome = asyncHandler(async (req, res) => {
  const { title, amount, account, category, description, date } = req.body;

  const income = IncomeSchema({
    user: req.user.id,
    title,
    amount,
    account,
    category,
    description,
    date,
  });

  if ((!title || !amount || !account || !category || !description || !date)) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  if (amount < 0 || !amount === "number") {
    res.status(400);
    throw new Error("Amount must be a positive number!");
  }
  const newIncome = await income.save();
  res.status(200).json({ message: "Income Added" });
});

exports.getIncomes = asyncHandler(async (req, res) => {
  const incomes = await IncomeSchema.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json(incomes);
});

exports.updateIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const income = await IncomeSchema.findById(id);

  if (!income) {
    res.status(401);
    throw new Error("Income not found");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (income.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  IncomeSchema.findByIdAndUpdate(id, req.body, { new: true })
    .then((income) => {
      res.status(200).json({ message: "Income updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
});

exports.deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const income = await IncomeSchema.findById(id);

  if (!income) {
    res.status(400);
    throw new Error("Income not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (income.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
});
