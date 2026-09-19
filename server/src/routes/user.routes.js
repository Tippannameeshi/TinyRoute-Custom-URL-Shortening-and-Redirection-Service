const express = require("express");
const UserController = require("../controllers/user.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { updateSettingsValidator } = require("../validators/user.validator");

const router = express.Router();

router.use(authenticate);

router.get("/settings", UserController.getSettings);
router.put("/settings", updateSettingsValidator, UserController.updateSettings);

module.exports = router;
