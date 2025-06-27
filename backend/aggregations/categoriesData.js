const asyncHandler = require("express-async-handler");
const TransactionSchema = require("../models/TransactionModel");
const { Types } = require("mongoose");
const { TYPES } = require("../libs/constants");

exports.getCategoriesData = async (userId, startDate, endDate) => {
  const endDateObject = endDate instanceof Date ? endDate : new Date(endDate);
  endDateObject.setHours(23, 59, 59, 999);
  return await TransactionSchema.aggregate([
    {
      $match: {
        user: new Types.ObjectId(userId),
        type: "Expense",
        $expr: {
          $or: [
            {
              $and: [{ $eq: [startDate, null] }, { $eq: [endDate, null] }],
            },
            {
              $and: [
                { $gte: ["$date", new Date(startDate)] },
                {
                  $lt: ["$date", endDateObject],
                },
              ],
            },
          ],
        },
      },
    },
    {
      $match: {
        type: TYPES.EXPENSE,
      },
    },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
        transactions: { $push: "$$ROOT" },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryData",
      },
    },
    {
      $unwind: "$categoryData",
    },
    {
      $project: {
        title: "$categoryData.title",
        color: "$categoryData.color",
        icon: "$categoryData.icon",
        totalAmount: "$totalAmount",
        transactions: "$transactions",
      },
    },
    {
      $sort: {
        totalAmount: -1,
      },
    },
  ]);
};
