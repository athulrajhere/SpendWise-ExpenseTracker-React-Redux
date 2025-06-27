const { Types } = require("mongoose");
const AccountSchema = require("../models/AccountModel");
const asyncHandler = require("express-async-handler");

exports.getTotalBalance = asyncHandler(async (userId) => {
  const result = await AccountSchema.aggregate([
    {
      $match: { user: new Types.ObjectId(userId) },
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
