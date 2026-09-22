const { body } = require("express-validator");
const validate = require("../middleware/validation.middleware");

const registerValidator = [
  body("first_name").trim().notEmpty().withMessage("First name is required."),
  body("last_name").trim().notEmpty().withMessage("Last name is required."),
  body("email").trim().isEmail().withMessage("Valid email address is required.").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number."),
  validate
];

const loginValidator = [
  body("email").trim().isEmail().withMessage("Valid email is required.").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required."),
  validate
];

const forgotPasswordValidator = [
  body("email").trim().isEmail().withMessage("Valid email is required.").normalizeEmail(),
  validate
];

const resetPasswordValidator = [
  body("token").notEmpty().withMessage("Reset token is required."),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("New password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("New password must contain at least one number.")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("New password must contain at least one special character."),
  validate
];

const changePasswordValidator = [
  body("current_password").notEmpty().withMessage("Current password is required."),
  body("new_password")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("New password must contain at least one uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("New password must contain at least one number.")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("New password must contain at least one special character."),
  validate
];

module.exports = {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator
};