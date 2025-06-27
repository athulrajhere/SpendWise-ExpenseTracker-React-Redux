const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  refreshToken,
  updateCurrency,
  logoutUser
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/get-user", protect, getUser);
router.post("/refresh-token", refreshToken);
router.post("/logout-user", logoutUser);

module.exports = router;
