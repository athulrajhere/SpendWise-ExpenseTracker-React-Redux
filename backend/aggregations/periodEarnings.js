const TransactionSchema = require("../models/TransactionModel");
const { Types } = require("mongoose");
const asyncHandler = require("express-async-handler");
const { TYPES } = require("../libs/constants");

exports.getPeriodEarnings = (async (userId, startDate, endDate) => {
  const endDateObject = endDate instanceof Date ? endDate : new Date(endDate);
  endDateObject.setHours(23, 59, 59, 999);

  const result = await TransactionSchema.aggregate([
    {
      $match: {
        user: new Types.ObjectId(userId),
        type: TYPES.INCOME,
        $expr: {
          $or: [
            { $and: [{ $eq: [startDate, null] }, { $eq: [endDate, null] }] },
            {
              $and: [
                { $gte: ["$date", startDate ? new Date(startDate) : undefined] },
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

  return result.length > 0 ? result[0].total : 0;
});
