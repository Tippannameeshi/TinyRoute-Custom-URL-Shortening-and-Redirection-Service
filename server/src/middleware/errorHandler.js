const logger = require("../config/logger");
const ApiResponse = require("../utils/ApiResponse");

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    err.message = "Invalid authentication token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    err.message = "Authentication token has expired";
  }

  logger.error({
    requestId: req.requestId,
    message: err.message,
    stack: err.stack,
    statusCode,
    url: req.originalUrl,
    method: req.method
  });

  return ApiResponse.error(
    res,
    err.message || "Internal Server Error",
    err.errors || [],
    statusCode
  );
};

module.exports = errorHandler;