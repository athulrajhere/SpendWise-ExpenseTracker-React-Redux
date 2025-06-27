const TransactionSchema = require("../models/TransactionModel");
const { Types } = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.getRecentTransactions = asyncHandler(async (userId, limit) => {
  return await TransactionSchema.find({
    user: userId,
  })
    .populate("category")
    .sort({ date: -1 })
    .limit(5);
});
