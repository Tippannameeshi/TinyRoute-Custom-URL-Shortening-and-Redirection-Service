const express = require("express");
const AnalyticsController = require("../controllers/analytics.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authenticate);

router.get("/overview", AnalyticsController.getDashboardOverview);
router.get("/url/:urlId", AnalyticsController.getUrlAnalytics);

module.exports = router;
