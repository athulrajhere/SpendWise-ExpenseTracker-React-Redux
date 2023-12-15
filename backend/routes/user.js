const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/get-user", protect, getUser);

module.exports = router;
