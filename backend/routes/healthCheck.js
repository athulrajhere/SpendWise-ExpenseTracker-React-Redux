const { healthCheck } = require("../controllers/healthCheck");

const router = require("express").Router();

router.get("/healthCheck", healthCheck);

module.exports = router;