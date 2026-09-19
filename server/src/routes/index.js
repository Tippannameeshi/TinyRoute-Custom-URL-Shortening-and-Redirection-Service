const express = require("express");

const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const urlRoutes = require("./url.routes");
const redirectRoutes = require("./redirect.routes");
const analyticsRoutes = require("./analytics.routes");
const adminRoutes = require("./admin.routes");
const userRoutes = require("./user.routes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/v1/auth", authRoutes);
router.use("/v1/urls", urlRoutes);
router.use("/v1/redirect", redirectRoutes);
router.use("/v1/analytics", analyticsRoutes);
router.use("/v1/admin", adminRoutes);
router.use("/v1/user", userRoutes);

module.exports = router;