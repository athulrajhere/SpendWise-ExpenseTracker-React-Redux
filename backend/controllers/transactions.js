const asyncHandler = require("express-async-handler");
const TransactionSchema = require("../models/TransactionModel");
const UserSchema = require("../models/UserModel");
const CategorySchema = require("../models/CatagoriesModel");
const AccountSchema = require("../models/AccountModel");
const CustomError = require("../utils/CustomError");
const { TYPES } = require("../libs/constants");

const handleSingleDeletion = async (id, req) => {
  const transaction = await TransactionSchema.findById(id);
  if (!transaction) {
    throw new CustomError("Transaction not found", 404);
  }

  if (!req.user) {
    throw new CustomError("User not found", 401);
  }

  if (transaction.user.toString() !== req.user.id) {
    throw new CustomError("User not authorized", 401);
  }

  await updateAccountAmount(id);

  const deletedTransaction = await TransactionSchema.findByIdAndDelete(id);
  if (!deletedTransaction) {
    throw new CustomError("Transaction not found", 404);
  }
};

const handleMultipleDeletions = async (ids) => {
  try {
    const deletedTransactions = await TransactionSchema.find({
      _id: { $in: ids },
    });
    const deletedTransactionIds = deletedTransactions.map(
      (transaction) => transaction._id
    );

    if (deletedTransactionIds.length > 0) {
      for (const transactionId of deletedTransactionIds) {
        await updateAccountAmount(transactionId);
      }

      await TransactionSchema.deleteMany({
        _id: { $in: deletedTransactionIds },
      });
    }
  } catch (error) {
    throw new CustomError("Error deleting transactions", 500);
  }
};

const updateAccountAmount = async (deletedTransaction) => {
  const transaction = await TransactionSchema.findById(deletedTransaction);
  const accountId = transaction.account;
  const accountInfo = await AccountSchema.findById(accountId);

  if (!accountInfo) {
    throw new CustomError("Account not found", 404);
  }

  let updatedAmount;

  const transactionAmount = parseFloat(transaction?.amount);
  const accountAmount = parseFloat(accountInfo?.amount);
  
  updatedAmount = accountAmount - transactionAmount;
  
  await AccountSchema.findByIdAndUpdate(accountId, {
    $set: { amount: updatedAmount },
  });
};

exports.addTransaction = asyncHandler(async (req, res) => {
  const {
    title,
    amount,
    account,
    category,
    description,
    date,
    isIncome,
    type,
  } = req.body;

  const transaction = TransactionSchema({
    user: req.user.id,
    title,
    amount,
    account,
    category,
    description,
    date,
    isIncome,
    type,
  });

  if (!title || !amount || !account || !category || !description || !date) {
    throw new CustomError("Please fill all fields", 400);
  }
  if (!amount === "number") {
    throw new CustomError("Amount must be a number!", 400);
  }

  const categoryInfo = await CategorySchema.findById(transaction.category);

  const accountInfo = await AccountSchema.findById(transaction.account);
  
  accountInfo.amount = parseFloat(amount) + parseFloat(accountInfo.amount);
  periodBalance = parseFloat(accountInfo.amount);

  accountInfo.numberOfTransactions = accountInfo.numberOfTransactions + 1;
  await accountInfo.save();

  const newTransaction = await transaction.save();
  res
    .status(200)
    .json({ data: transaction, message: "New transaction added successfully" });
});

exports.getTransactions = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const endDateObject = endDate instanceof Date ? endDate : new Date(endDate);
  endDateObject.setHours(23, 59, 59, 999);

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null; 
  if (end) {
    end.setHours(23, 59, 59, 999);
  }

  const query = { user: req.user.id };

  if (start && end) {
    query.date = { $gte: start, $lte: end };
  } else if (start) {
    query.date = { $gte: start };
  } else if (end) {
    query.date = { $lte: end };
  }


  const transactions = await TransactionSchema.find({
    user: req.user.id,
   ...query,
  })
    .populate("category account")
    .sort({
      createdAt: -1,
    })
    .exec();
  res.status(200).json({
    data: transactions,
    message: "Transactions loaded successfully",
  });
});

exports.updateTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    amount,
    account,
    category,
    description,
    date,
    isIncome,
    type,
  } = req.body;

  if (!title || !amount || !account || !category || !description || !date) {
    throw new CustomError("Please fill all fields", 400);
  }
  if (!amount === "number") {
    throw new CustomError("Amount must be a number!", 400);
  }

  const transaction = await TransactionSchema.findById(id);

  if (!transaction) {
    throw new CustomError("Transaction not found", 401);
  }

  if (!req.user) {
    throw new CustomError("User not found", 400);
  }

  if (transaction.user.toString() !== req.user.id) {
    throw new CustomError("Unauthorized", 401);
  }

  const newAccountId = account;
  const oldAccountId = transaction.account;
  const newAccountInfo = await AccountSchema.findById(newAccountId);
  const oldAccountInfo = await AccountSchema.findById(oldAccountId);

  if (!newAccountInfo || !oldAccountInfo) {
    throw new CustomError("Account not found", 404);
  }

  try {
    if (oldAccountId.toString() !== newAccountId.toString()) {

      const oldAccountUpdatedAmount = parseFloat(oldAccountInfo.amount) - parseFloat(transaction.amount);
      await AccountSchema.findByIdAndUpdate(oldAccountId, {
        $set: { amount: oldAccountUpdatedAmount }
      });

      const newAccountUpdatedAmount = parseFloat(newAccountInfo.amount) + parseFloat(amount);
      await AccountSchema.findByIdAndUpdate(newAccountId, {
        $set: { amount: newAccountUpdatedAmount }
      });
    } else {
      const updatedAmount = parseFloat(newAccountInfo.amount) + (parseFloat(amount) - parseFloat(transaction.amount));
      await AccountSchema.findByIdAndUpdate(newAccountId, {
        $set: { amount: updatedAmount }
      });
    }

    const updatedTransaction = await TransactionSchema.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("category account")
      .sort({
        createdAt: -1,
      })
      .exec();

    if (updatedTransaction) {
      res.status(200).json({
        data: updatedTransaction,
        message: "Transaction updated successfully",
      });
    } else {
      res.status(404).json({
        message: "Transaction not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

exports.deleteSingleTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await handleSingleDeletion(id, req);

    res
      .status(200)
      .json({ id: id, message: "Transaction deleted successfully" });
  } catch (error) {
    if (error.statusCode && error.message) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Server Error" });
    }
  }
});

exports.deleteMultipleTransactions = async (req, res) => {
  const { ids } = req.body;

  if (!req.user) {
    throw new CustomError("User not found", 401);
  }

  const checkAuthorization = async (userId, transactionIds) => {
    try {
      const unauthorizedTransactions = await TransactionSchema.find({
        _id: { $in: transactionIds },
        user: { $ne: userId },
      });

      const unauthorizedIds = unauthorizedTransactions.map((transaction) =>
        transaction._id.toString()
      );

      return unauthorizedIds;
    } catch (error) {
      throw new CustomError("Error checking authorization");
    }
  };

  const unauthorizedIds = await checkAuthorization(req.user.id, ids);

  if (unauthorizedIds.length > 0) {
    return res.status(403).json({
      message:
        "Forbidden: User does not have permission to delete certain transactions",
      unauthorizedIds: unauthorizedIds,
    });
  }

  try {
    await handleMultipleDeletions(ids);

    res
      .status(200)
      .json({ ids: ids, message: "Transactions deleted successfully" });
  } catch (error) {
    res.status(error.statusCode).json({ message: "Server Error" });
  }
};

exports.deleteTransactionsSelected = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let arr = id.split("&");
  let data = await TransactionSchema.find({
    _id: {
      $in: arr,
    },
  });

  if (!data) {
    throw new CustomError("Invalid data", 400);
  }

  if (!req.user) {
    throw new CustomError("User not found", 401);
  }

  if (data[0].user.toString() !== req.user.id) {
    throw new CustomError("User not authorized", 401);
  }

  TransactionSchema.deleteMany({
    _id: arr,
  })
    .then((transaction) => {
      res
        .status(200)
        .json({ ids: arr, message: "Transactions deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
});
