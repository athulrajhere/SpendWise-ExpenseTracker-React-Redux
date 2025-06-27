const { protect } = require("../middleware/authMiddleware");
const {
  addAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} = require("../controllers/account");

const router = require("express").Router();

router.post("/add-account", protect, addAccount);

router.get("/get-accounts", protect, getAccounts);

router.put("/update-account/:id", protect, updateAccount);

router.delete("/delete-account/:id", protect, deleteAccount);

module.exports = router;
