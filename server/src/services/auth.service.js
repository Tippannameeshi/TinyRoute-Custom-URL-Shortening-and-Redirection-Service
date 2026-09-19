const UserRepository = require("../repositories/UserRepository");
const RefreshTokenRepository = require("../repositories/RefreshTokenRepository");
const PasswordResetRepository = require("../repositories/PasswordResetRepository");
const EmailVerificationRepository = require("../repositories/EmailVerificationRepository");
const AuditLogRepository = require("../repositories/AuditLogRepository");

const { hashPassword, comparePassword, hashToken, generateRandomToken } = require("../utils/password");
const { generateAuthTokens } = require("../helpers/token.helper");
const { verifyRefreshToken } = require("../utils/jwt");
const { auditLogger } = require("../config/logger");

const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");

class AuthService {
  async register({ first_name, last_name, email, password }, ipAddress, requestId) {
    const existing = await UserRepository.findByEmail(email);
    if (existing) {
      throw new ConflictError("Email address is already registered.", "EMAIL_IN_USE");
    }

    const password_hash = await hashPassword(password);
    const userId = await UserRepository.create({
      first_name,
      last_name,
      email,
      password_hash,
      role: "USER",
      is_verified: false,
      is_active: true
    });

    // Create verification token
    const rawVerificationToken = generateRandomToken();
    const token_hash = hashToken(rawVerificationToken);
    const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await EmailVerificationRepository.create({ user_id: userId, token_hash, expires_at });

    const user = await UserRepository.findById(userId);

    // Audit log
    await AuditLogRepository.create({
      user_id: userId,
      action: "REGISTER",
      details: `User registered: ${email}`,
      ip_address: ipAddress,
      request_id: requestId
    });
    auditLogger.info({ action: "REGISTER", userId, email, ipAddress, requestId });

    const familyId = generateRandomToken(16);
    const { accessToken, refreshToken } = generateAuthTokens(user, familyId);

    // Store refresh token
    const refreshTokenHash = hashToken(refreshToken);
    const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshTokenRepository.create({
      user_id: userId,
      token_hash: refreshTokenHash,
      family_id: familyId,
      device_info: "Web Browser",
      ip_address: ipAddress,
      expires_at: refreshExpiry
    });

    return { user, accessToken, refreshToken, verificationToken: rawVerificationToken };
  }

  async login({ email, password }, ipAddress, requestId, deviceInfo = "Web Browser") {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password.", "INVALID_CREDENTIALS");
    }

    if (!user.is_active) {
      throw new UnauthorizedError("Your account has been deactivated. Please contact support.", "ACCOUNT_DISABLED");
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid email or password.", "INVALID_CREDENTIALS");
    }

    await UserRepository.updateLastLogin(user.id);

    const familyId = generateRandomToken(16);
    const fullUser = await UserRepository.findById(user.id);
    const { accessToken, refreshToken } = generateAuthTokens(fullUser, familyId);

    const refreshTokenHash = hashToken(refreshToken);
    const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshTokenRepository.create({
      user_id: user.id,
      token_hash: refreshTokenHash,
      family_id: familyId,
      device_info: deviceInfo,
      ip_address: ipAddress,
      expires_at: refreshExpiry
    });

    await AuditLogRepository.create({
      user_id: user.id,
      action: "LOGIN",
      details: `User logged in: ${email}`,
      ip_address: ipAddress,
      request_id: requestId
    });
    auditLogger.info({ action: "LOGIN", userId: user.id, email, ipAddress, requestId });

    return { user: fullUser, accessToken, refreshToken };
  }

  async refreshToken(incomingToken, ipAddress, requestId) {
    if (!incomingToken) {
      throw new UnauthorizedError("Refresh token is required.", "MISSING_REFRESH_TOKEN");
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(incomingToken);
    } catch (err) {
      throw new UnauthorizedError("Invalid or expired refresh token.", "INVALID_REFRESH_TOKEN");
    }

    const incomingHash = hashToken(incomingToken);
    const storedToken = await RefreshTokenRepository.findByTokenHash(incomingHash);

    if (!storedToken) {
      throw new UnauthorizedError("Refresh token not found.", "TOKEN_NOT_FOUND");
    }

    // Reuse detection: If token was revoked, revoke the ENTIRE token family!
    if (storedToken.is_revoked) {
      await RefreshTokenRepository.revokeFamily(storedToken.family_id);
      auditLogger.warn({ action: "REFRESH_TOKEN_REUSE_DETECTED", familyId: storedToken.family_id, userId: storedToken.user_id, ipAddress });
      throw new UnauthorizedError("Security Alert: Token reuse detected. Please log in again.", "TOKEN_REUSE_DETECTED");
    }

    const user = await UserRepository.findById(decoded.id);
    if (!user || !user.is_active) {
      throw new UnauthorizedError("User account disabled or not found.", "UNAUTHORIZED");
    }

    // Revoke old refresh token
    await RefreshTokenRepository.revokeToken(storedToken.id);

    // Issue new pair with same family ID
    const { accessToken, refreshToken: newRefreshToken } = generateAuthTokens(user, storedToken.family_id);

    const newHash = hashToken(newRefreshToken);
    const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshTokenRepository.create({
      user_id: user.id,
      token_hash: newHash,
      family_id: storedToken.family_id,
      device_info: storedToken.device_info,
      ip_address: ipAddress,
      expires_at: refreshExpiry
    });

    return { accessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken, userId, ipAddress, requestId) {
    if (refreshToken) {
      const incomingHash = hashToken(refreshToken);
      const storedToken = await RefreshTokenRepository.findByTokenHash(incomingHash);
      if (storedToken) {
        await RefreshTokenRepository.revokeToken(storedToken.id);
      }
    }

    if (userId) {
      await AuditLogRepository.create({
        user_id: userId,
        action: "LOGOUT",
        details: "User logged out",
        ip_address: ipAddress,
        request_id: requestId
      });
      auditLogger.info({ action: "LOGOUT", userId, ipAddress, requestId });
    }
  }

  async forgotPassword(email, ipAddress, requestId) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      // Return success anyway to avoid user enumeration
      return { message: "If that email exists, reset instructions have been sent." };
    }

    const rawResetToken = generateRandomToken();
    const token_hash = hashToken(rawResetToken);
    const expires_at = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await PasswordResetRepository.create({
      user_id: user.id,
      token_hash,
      expires_at
    });

    await AuditLogRepository.create({
      user_id: user.id,
      action: "FORGOT_PASSWORD",
      details: `Password reset requested for ${email}`,
      ip_address: ipAddress,
      request_id: requestId
    });

    return { resetToken: rawResetToken, message: "Password reset instructions generated." };
  }

  async resetPassword({ token, newPassword }, ipAddress, requestId) {
    const token_hash = hashToken(token);
    const record = await PasswordResetRepository.findByTokenHash(token_hash);

    if (!record) {
      throw new BadRequestError("Invalid or expired password reset token.", "INVALID_RESET_TOKEN");
    }

    const password_hash = await hashPassword(newPassword);
    await UserRepository.updatePassword(record.user_id, password_hash);
    await PasswordResetRepository.markAsUsed(record.id);
    await RefreshTokenRepository.revokeUserTokens(record.user_id);

    await AuditLogRepository.create({
      user_id: record.user_id,
      action: "CHANGE_PASSWORD",
      details: "Password reset completed via token",
      ip_address: ipAddress,
      request_id: requestId
    });

    return { message: "Password has been reset successfully. Please log in." };
  }

  async verifyEmail(token, ipAddress, requestId) {
    const token_hash = hashToken(token);
    const record = await EmailVerificationRepository.findByTokenHash(token_hash);

    if (!record) {
      throw new BadRequestError("Invalid or expired verification token.", "INVALID_VERIFICATION_TOKEN");
    }

    await UserRepository.updateVerificationStatus(record.user_id, true);
    await EmailVerificationRepository.markAsVerified(record.id);

    await AuditLogRepository.create({
      user_id: record.user_id,
      action: "VERIFY_EMAIL",
      details: "Email address verified",
      ip_address: ipAddress,
      request_id: requestId
    });

    return { message: "Email address verified successfully." };
  }

  async resendVerification(userId, ipAddress, requestId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found.");
    if (user.is_verified) throw new BadRequestError("Email is already verified.");

    const rawVerificationToken = generateRandomToken();
    const token_hash = hashToken(rawVerificationToken);
    const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await EmailVerificationRepository.create({ user_id: userId, token_hash, expires_at });

    return { verificationToken: rawVerificationToken, message: "Verification token resent." };
  }
}

module.exports = new AuthService();
