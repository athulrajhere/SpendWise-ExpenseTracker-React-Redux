
const { getDashboardData } = require("../controllers/dashboard");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/get-dashboard", protect, getDashboardData);

module.exports = router;
