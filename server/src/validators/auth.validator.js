const { body } = require("express-validator");

const registerValidator = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 100 }),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 100 }),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage(
      "Password must contain at least 8 characters"
    )
    .matches(/[A-Z]/)
    .withMessage(
      "Password must contain an uppercase letter"
    )
    .matches(/[a-z]/)
    .withMessage(
      "Password must contain a lowercase letter"
    )
    .matches(/[0-9]/)
    .withMessage(
      "Password must contain a number"
    )
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage(
      "Password must contain a special character"
    )
];

const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];

module.exports = {
  registerValidator,
  loginValidator
};