const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    errorCode: "TOO_MANY_AUTH_REQUESTS",
    message: "Too many authentication attempts. Please try again after 15 minutes."
  }
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    errorCode: "TOO_MANY_REQUESTS",
    message: "Too many requests. Please try again later."
  }
});

const redirectLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    errorCode: "TOO_MANY_REDIRECTS",
    message: "Too many redirect requests. Please try again later."
  }
});

module.exports = {
  authLimiter,
  apiLimiter,
  redirectLimiter
};
