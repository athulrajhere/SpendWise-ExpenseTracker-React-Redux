const {
  addExpenseCategory,
  getExpenseCategories,
  updateExpenseCategory,
  deleteExpenseCategory,
} = require("../controllers/expenseCategory");
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/add-category", protect, addCategory);

router.get("/get-categories", protect, getCategories);

router.put("/update-category/:id", protect, updateCategory);

router.delete("/delete-category/:id", protect, deleteCategory);

module.exports = router;
