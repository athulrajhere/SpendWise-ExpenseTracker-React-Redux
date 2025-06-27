const TransactionSchema = require("../models/TransactionModel");
const { Types } = require("mongoose");
const asyncHandler = require("express-async-handler");
const { TYPES } = require("../libs/constants");

exports.getPeriodExpenses = async (userId, startDate, endDate) => {
  const endDateObject = endDate instanceof Date ? endDate : new Date(endDate);
  endDateObject.setHours(23, 59, 59, 999);

  const result = await TransactionSchema.aggregate([
    {
      $match: {
        user: new Types.ObjectId(userId),
        type: TYPES.EXPENSE,
        $expr: {
          $or: [
            {
              $and: [{ $eq: [startDate, null] }, { $eq: [endDate, null] }],
            },
            {
              $and: [
                { $gte: ["$date", new Date(startDate)] },
                { $lte: ["$date", endDateObject] },
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);
  

  return result.length > 0 ? result[0].total : 0
};
