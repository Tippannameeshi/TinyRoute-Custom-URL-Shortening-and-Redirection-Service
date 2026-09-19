const express = require("express");
const RedirectController = require("../controllers/redirect.controller");
const { redirectLimiter } = require("../middleware/rateLimiter");
const { verifyUrlPasswordValidator } = require("../validators/url.validator");

const router = express.Router();

router.get("/:shortCode", redirectLimiter, RedirectController.getRedirectInfo);
router.post("/:shortCode/verify", redirectLimiter, verifyUrlPasswordValidator, RedirectController.verifyPassword);

module.exports = router;
