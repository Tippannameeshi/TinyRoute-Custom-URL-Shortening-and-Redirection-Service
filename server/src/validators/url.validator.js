const { body, param } = require("express-validator");
const validate = require("../middleware/validation.middleware");

const createUrlValidator = [
  body("original_url")
    .trim()
    .notEmpty()
    .withMessage("Original URL is required.")
    .isURL({ require_protocol: true })
    .withMessage("Must be a valid HTTP or HTTPS URL."),
  body("custom_alias")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Custom alias must be between 3 and 50 characters.")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Custom alias can only contain letters, numbers, underscores, and hyphens.",
    ),
  body("max_clicks")
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Max clicks must be a positive integer."),
  body("password")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("URL protection password must be at least 4 characters."),
  body("expires_at")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Expires at must be a valid ISO date string."),
  validate,
];

const updateUrlValidator = [
  param("id").isInt().withMessage("Valid URL ID parameter is required."),
  body("original_url")
    .optional()
    .trim()
    .isURL({ require_protocol: true })
    .withMessage("Must be a valid HTTP or HTTPS URL."),
  body("custom_alias")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Custom alias must be between 3 and 50 characters.")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Custom alias can only contain letters, numbers, underscores, and hyphens.",
    ),
  validate,
];

const bulkCreateUrlValidator = [
  body("urls")
    .isArray({ min: 1, max: 50 })
    .withMessage("URLs must contain between 1 and 50 items."),
  body("urls.*.original_url")
    .trim()
    .notEmpty()
    .withMessage("Original URL is required.")
    .isURL({ require_protocol: true })
    .withMessage("Must be a valid HTTP or HTTPS URL."),
  body("urls.*.custom_alias")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Custom alias must be between 3 and 50 characters.")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Custom alias can only contain letters, numbers, underscores, and hyphens.",
    ),
  body("urls.*.max_clicks")
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Max clicks must be a positive integer."),
  body("urls.*.expires_at")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Expires at must be a valid ISO date string."),
  validate,
];

const verifyUrlPasswordValidator = [
  body("password")
    .notEmpty()
    .withMessage("Password is required for verification."),
  validate,
];

module.exports = {
  createUrlValidator,
  bulkCreateUrlValidator,
  updateUrlValidator,
  verifyUrlPasswordValidator,
};
