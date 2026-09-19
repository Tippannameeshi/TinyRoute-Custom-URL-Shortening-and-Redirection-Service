const RESPONSE_MESSAGES = {
  SUCCESS: 'Operation completed successfully.',
  REGISTER_SUCCESS: 'User registered successfully.',
  LOGIN_SUCCESS: 'User logged in successfully.',
  LOGOUT_SUCCESS: 'User logged out successfully.',
  REFRESH_SUCCESS: 'Token refreshed successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  PASSWORD_RESET_SENT: 'Password reset instructions sent.',
  PASSWORD_RESET_SUCCESS: 'Password reset successfully.',
  EMAIL_VERIFIED: 'Email verified successfully.',
  VERIFICATION_SENT: 'Verification email sent.',
  
  URL_CREATED: 'Short URL created successfully.',
  URL_UPDATED: 'URL updated successfully.',
  URL_DELETED: 'URL deleted successfully.',
  URL_STATUS_TOGGLED: 'URL status updated successfully.',
  BULK_URL_CREATED: 'Bulk URLs created successfully.',

  UNAUTHORIZED: 'Authentication required. Please log in.',
  FORBIDDEN: 'Access denied. You do not have permission for this resource.',
  NOT_FOUND: 'Resource not found.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_IN_USE: 'Email address is already registered.',
  ALIAS_IN_USE: 'Custom alias is already taken.',
  URL_EXPIRED: 'This short URL has expired.',
  URL_DISABLED: 'This short URL is currently disabled.',
  URL_MAX_CLICKS_REACHED: 'This short URL has reached its maximum click limit.',
  PASSWORD_REQUIRED: 'Password required to access this URL.',
  INVALID_URL_PASSWORD: 'Incorrect password for short URL.',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later.'
};

module.exports = RESPONSE_MESSAGES;
