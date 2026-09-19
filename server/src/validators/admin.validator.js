const { body, param } = require("express-validator");
const validate = require("../middleware/validation.middleware");

const updateUserStatusValidator = [
  param("id").isInt().withMessage("Valid user ID parameter is required."),
  body("is_active").isBoolean().withMessage("is_active must be a boolean."),
  validate
];

const updateUserRoleValidator = [
  param("id").isInt().withMessage("Valid user ID parameter is required."),
  body("role").isIn(["USER", "ADMIN"]).withMessage("Role must be either USER or ADMIN."),
  validate
];

module.exports = {
  updateUserStatusValidator,
  updateUserRoleValidator
};
