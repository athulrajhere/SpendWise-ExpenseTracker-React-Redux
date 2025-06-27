const asyncHandler = require("express-async-handler");
const AccountSchema = require("../models/AccountModel");
const { Types } = require("mongoose");
const { TYPES } = require("../libs/constants");


exports.getAccountDetails = async (userId) => {
  return await AccountSchema.aggregate([
    {
      $match: {
        user: new Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "transactions",
        localField: "_id",
        foreignField: "account",
        as: "transactions",
      },
    },
    {
      $unwind: "$transactions",
    },
    {
      $group: {
        _id: {
          accountId: "$_id",
          title: "$title",
          icon: "$icon",
          amount: "$amount",
        },
        totalIncome: {
          $sum: {
            $cond: [
              { $eq: ["$transactions.type", TYPES.INCOME] },
              "$transactions.amount",
              0,
            ],
          },
        },
        totalExpense: {
          $sum: {
            $cond: [
              { $eq: ["$transactions.type", TYPES.EXPENSE] },
              "$transactions.amount",
              0,
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: "$_id.accountId",
        title: "$_id.title",
        icon: "$_id.icon",
        balance: "$_id.amount",
        totalIncome: 1,
        totalExpense: 1,
      },
    },
    {
      $sort: {
        title: 1,
      },
    },
  ]);
};
