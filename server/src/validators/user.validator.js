const { body } = require("express-validator");
const validate = require("../middleware/validation.middleware");

const updateProfileValidator = [
  body("first_name").trim().notEmpty().withMessage("First name cannot be empty."),
  body("last_name").trim().notEmpty().withMessage("Last name cannot be empty."),
  validate
];

const updateSettingsValidator = [
  body("theme").optional().isIn(["light", "dark", "system"]).withMessage("Invalid theme."),
  body("notify_on_click").optional().isBoolean().withMessage("Must be a boolean value."),
  body("notify_on_expiration").optional().isBoolean().withMessage("Must be a boolean value."),
  validate
];

module.exports = {
  updateProfileValidator,
  updateSettingsValidator
};
