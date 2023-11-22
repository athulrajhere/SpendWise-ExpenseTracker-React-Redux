const {
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
  updateIncome,
} = require("../controllers/income");

const router = require("express").Router();

router.post("/add-income", addIncome);

router.get("/get-incomes", getIncomes);

router.put("/update-income/:id", updateIncome);

router.delete("/delete-income/:id", deleteIncome);

router.post("/add-expense", addExpense);

router.get("/get-expenses", getExpense);

router.put("/update-expense/:id", updateExpense);

router.delete("/delete-expense/:id", deleteExpense);

module.exports = router;
