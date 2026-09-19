const AuthService = require("../services/auth.service");
const UserRepository = require("../repositories/UserRepository");
const { hashPassword, comparePassword } = require("../utils/password");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatusCodes");
const RESPONSE_MESSAGES = require("../constants/responseMessages");
const BadRequestError = require("../errors/BadRequestError");
const AuditLogRepository = require("../repositories/AuditLogRepository");

class AuthController {
  register = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const result = await AuthService.register(
      { first_name, last_name, email, password },
      req.ip,
      req.id
    );

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return ApiResponse.success(res, HTTP_STATUS.CREATED, RESPONSE_MESSAGES.REGISTER_SUCCESS, {
      user: result.user,
      accessToken: result.accessToken
    });
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await AuthService.login(
      { email, password },
      req.ip,
      req.id,
      req.headers["user-agent"]
    );

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.LOGIN_SUCCESS, {
      user: result.user,
      accessToken: result.accessToken
    });
  });

  refreshToken = asyncHandler(async (req, res) => {
    const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken;
    const result = await AuthService.refreshToken(incomingToken, req.ip, req.id);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.REFRESH_SUCCESS, {
      accessToken: result.accessToken
    });
  });

  logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    await AuthService.logout(refreshToken, req.user?.id, req.ip, req.id);

    res.clearCookie("refreshToken");
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.LOGOUT_SUCCESS);
  });

  getProfile = asyncHandler(async (req, res) => {
    const user = await UserRepository.findById(req.user.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, user);
  });

  updateProfile = asyncHandler(async (req, res) => {
    const { first_name, last_name } = req.body;
    const updatedUser = await UserRepository.updateProfile(req.user.id, { first_name, last_name });

    await AuditLogRepository.create({
      user_id: req.user.id,
      action: "UPDATE_PROFILE",
      details: `Profile updated: ${first_name} ${last_name}`,
      ip_address: req.ip,
      request_id: req.id
    });

    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.PROFILE_UPDATED, updatedUser);
  });

  changePassword = asyncHandler(async (req, res) => {
    const { current_password, new_password } = req.body;
    const user = await UserRepository.findByEmail(req.user.email);

    const isMatch = await comparePassword(current_password, user.password_hash);
    if (!isMatch) {
      throw new BadRequestError("Current password does not match.", "INVALID_PASSWORD");
    }

    const newHash = await hashPassword(new_password);
    await UserRepository.updatePassword(req.user.id, newHash);

    await AuditLogRepository.create({
      user_id: req.user.id,
      action: "CHANGE_PASSWORD",
      details: "Password changed successfully",
      ip_address: req.ip,
      request_id: req.id
    });

    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.PASSWORD_CHANGED);
  });

  forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await AuthService.forgotPassword(email, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.PASSWORD_RESET_SENT, result);
  });

  resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;
    const result = await AuthService.resetPassword({ token, newPassword }, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.PASSWORD_RESET_SUCCESS, result);
  });

  verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;
    const result = await AuthService.verifyEmail(token, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.EMAIL_VERIFIED, result);
  });

  resendVerification = asyncHandler(async (req, res) => {
    const result = await AuthService.resendVerification(req.user.id, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.VERIFICATION_SENT, result);
  });
}

module.exports = new AuthController();
