const TransactionSchema = require("../models/TransactionModel");
const { Types } = require("mongoose");
const asyncHandler = require("express-async-handler");
const { TYPES } = require("../libs/constants");

exports.getTotalSpendThisMonth = asyncHandler(async (userId) => {
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const result = await TransactionSchema.aggregate([
    {
      $match: {
        user: new Types.ObjectId(userId),
        type: TYPES.EXPENSE,
        date: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  return result.length > 0 ? result[0].total : 0;
});
