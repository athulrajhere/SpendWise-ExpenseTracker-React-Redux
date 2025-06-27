const { protect } = require("../middleware/authMiddleware");
const { getOverviewData } = require("../controllers/overview");

const router = require("express").Router();

router.get("/get-overview", protect, getOverviewData);

module.exports = router;
