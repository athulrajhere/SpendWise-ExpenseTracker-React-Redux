const TransactionSchema = require("../models/TransactionModel");
const { Types } = require("mongoose");
const asyncHandler = require("express-async-handler");
const { TYPES } = require("../libs/constants");

exports.getFinancialPersona = (savingsRate) => {
    savingsRate = parseFloat(savingsRate);
  
    if (savingsRate > 50) return "The Budget Master 🏆";
    if (savingsRate < 0) return "The Risk Taker 🎲";
    if (savingsRate <= 20) return "The Impulse Buyer 🛍️";
    if (savingsRate >= 30 && savingsRate <= 50) return "The Balanced Planner ⚖️";
  
    return "The Savings Guru 💰";
  };

exports.getTotalTransactionsCount = asyncHandler(async (userId, limit) => {
    const totalTransactions = await TransactionSchema.countDocuments({ user: userId });
    return totalTransactions;
});

exports.getCategoryWithMostSpent = asyncHandler(async (userId) => {
    const result = await TransactionSchema.aggregate([
        {
            $match: {
              user: new Types.ObjectId(userId),
              isIncome: false
            }
          },
          {
            "$group": {
              "_id": "$category",
              "totalSpending": {
                "$sum": { "$abs": "$amount" }
              }
            }
          },
          {
            "$sort": {
              "totalSpending": -1
            }
          },
           {
            "$limit": 1
          },
          {
            "$lookup": {
              "from": "categories",
              "localField": "_id",
              "foreignField": "_id",
              "as": "categoryInfo"
            }
          },
          {
            "$unwind": "$categoryInfo"
          },
          {
            "$project": {
              "categoryName": "$categoryInfo.title",
              "totalSpending": 1
            }
          }
      ]);
    
      return result[0] || null;
});

exports.getSavingsRate = asyncHandler(async (userId) => {
    const result = await TransactionSchema.aggregate([
        {
          $match: { user: new Types.ObjectId(userId), }
        },
        {
          $group: {
            _id: "$isIncome",
            totalAmount: { $sum: "$amount" }
          }
        }
      ]);

      let totalIncome = 0;
      let totalExpenses = 0;
    
      result.forEach((entry) => {
        if (entry._id === true) {
          totalIncome = entry.totalAmount;
        } else {
          totalExpenses = Math.abs(entry.totalAmount);;
        }
      });

      if (totalIncome === 0) {
        return 0 ;
      }
      
      const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
    
      return `${savingsRate.toFixed(2)}%` 
});
