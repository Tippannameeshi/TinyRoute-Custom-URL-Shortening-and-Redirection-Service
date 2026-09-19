const express = require("express");
const AuthController = require("../controllers/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authLimiter } = require("../middleware/rateLimiter");
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator
} = require("../validators/auth.validator");
const { updateProfileValidator } = require("../validators/user.validator");

const router = express.Router();

router.post("/register", authLimiter, registerValidator, AuthController.register);
router.post("/login", authLimiter, loginValidator, AuthController.login);
router.post("/refresh", AuthController.refreshToken);
router.post("/logout", AuthController.logout);

router.get("/profile", authenticate, AuthController.getProfile);
router.put("/profile", authenticate, updateProfileValidator, AuthController.updateProfile);
router.post("/change-password", authenticate, changePasswordValidator, AuthController.changePassword);

router.post("/forgot-password", authLimiter, forgotPasswordValidator, AuthController.forgotPassword);
router.post("/reset-password", authLimiter, resetPasswordValidator, AuthController.resetPassword);

router.get("/verify-email", AuthController.verifyEmail);
router.post("/resend-verification", authenticate, AuthController.resendVerification);

module.exports = router;