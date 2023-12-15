const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
  updateIncome,
} = require("../controllers/income");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/add-income", protect, addIncome);

router.get("/get-incomes", protect, getIncomes);

router.put("/update-income/:id", protect, updateIncome);

router.delete("/delete-income/:id", protect, deleteIncome);

router.post("/add-expense", protect, addExpense);

router.get("/get-expenses", protect, getExpenses);

router.put("/update-expense/:id", protect, updateExpense);

router.delete("/delete-expense/:id", protect, deleteExpense);

module.exports = router;
