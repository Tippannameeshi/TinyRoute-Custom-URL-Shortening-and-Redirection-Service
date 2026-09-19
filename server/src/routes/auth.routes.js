const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const validate = require("../middleware/validation.middleware");

const {
    registerValidator
} = require("../validators/auth.validator");

router.post(
    "/register",
    registerValidator,
    validate,
    authController.register
);

module.exports = router;