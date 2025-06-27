("use strict");
const asyncHandler = require("express-async-handler");
const AccountSchema = require("../models/AccountModel");
const UserSchema = require("../models/UserModel");
const TransactionSchema = require("../models/TransactionModel");
const CustomError = require("../utils/CustomError");

exports.addAccount = asyncHandler(async (req, res) => {
  const { title, initialAmount, amount, icon } = req.body;

  const account = AccountSchema({
    user: req.user.id,
    title,
    initialAmount,
    amount,
    icon,
  });

  if (!title || !amount || !icon) {
    throw new CustomError("Please fill all fields", 400);
  }

  const newAccount = await account.save();
  res
    .status(200)
    .json({ data: newAccount, message: "New account added successfully" });
});

exports.getAccounts = asyncHandler(async (req, res) => {
  const accounts = await AccountSchema.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res
    .status(200)
    .json({ data: accounts, message: "Account loaded successfully" });
});

exports.updateAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, initialAmount, amount, icon } = req.body;

  if (!title || !initialAmount || !amount || !icon) {
    throw new CustomError("Please fill all fields", 400);
  }

  const account = await AccountSchema.findById(id);

  if (!account) {
    throw new CustomError("account not found", 400);
  }

  if (!req.user) {
    throw new CustomError("User not found", 401);
  }

  if (account.user.toString() !== req.user.id) {
    throw new CustomError("Unauthorized", 401);
  }
  const updatedAccount = await AccountSchema.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    data: updatedAccount,
    message: "Account updated successfully",
  });
});

exports.deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const account = await AccountSchema.findById(id);

  if (!account) {
    throw new CustomError("Account not found", 400);
  }

  if (!req.user) {
    throw new CustomError("User not found", 401);
  }

  if (account.user.toString() !== req.user.id) {
    throw new CustomError("User not authorized", 401);
  }

  const deletedAccount = await AccountSchema.findByIdAndDelete(id);

  if (!deletedAccount) {
    throw new CustomError("Account not found", 400);
  }

  try {
    await TransactionSchema.deleteMany({ account: id });

    res.status(200).json({
      id: id,
      message: "Account and associated transactions deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
