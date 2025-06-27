const asyncHandler = require("express-async-handler");
const TransactionSchema = require("../models/TransactionModel");
const AccountSchema = require("../models/AccountModel");
const { TYPES } = require("../libs/constants");
const { default: mongoose } = require("mongoose");
const { getAccountBalance } = require("../aggregations/accountBalance");
const { getTotalSpendThisMonth } = require("../aggregations/totalSpendThisMonth");
const { getTotalBalance } = require("../aggregations/totalBalance");
const { getPeriodEarnings } = require("../aggregations/periodEarnings");
const { getRecentTransactions } = require("../aggregations/recentTransactions");
const { getChangesData } = require("../aggregations/changesData");
const { getAccountDetails } = require("../aggregations/accountDetails");
const { getCategoriesData } = require("../aggregations/categoriesData");
const { getPeriodExpenses } = require("../aggregations/periodExpenses");
const { getTotalTransactionsCount, getCategoryWithMostSpent, getSavingsRate, getFinancialPersona } = require("../aggregations/profileInfo");

exports.getDashboardData = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;
    
    const totalSpendThisMonth = await getTotalSpendThisMonth(userId);
    const totalBalance = await getTotalBalance(userId);
    const periodEarnings = await getPeriodEarnings(userId, startDate, endDate);
    const periodExpenses = await getPeriodExpenses(userId, startDate, endDate);
    const recentTransactions = await getRecentTransactions(userId);
    const changesData = await getChangesData(userId, startDate, endDate);
    const accountDetails = await getAccountDetails(userId);
    const accountBalance = await getAccountBalance(userId);
    const categoriesData = await getCategoriesData(userId, startDate, endDate);
    const totalTransactionsCount = await getTotalTransactionsCount(userId);
    const categoryWithMostSpent = await getCategoryWithMostSpent(userId);
    const savingsRate = await getSavingsRate(userId);
    const userPersona = await getFinancialPersona(savingsRate);

    const response = {
      periodChange: periodEarnings - periodExpenses,
      totalBalance,
      periodEarnings,
      periodExpenses,
      recentTransactions,
      changesData,
      accountDetails,
      accountBalance,
      categoriesData,
      totalTransactionsCount,
      categoryWithMostSpent,
      savingsRate,
      userPersona,
      startDate: startDate ? new Date(startDate) : new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: endDate ? new Date(endDate) : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    };

    res.status(200).json({ data: response, message: "Dashboard loaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.response.status });
  }
});
