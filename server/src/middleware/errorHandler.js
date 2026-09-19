const ApiResponse = require("../utils/ApiResponse");
const { logger } = require("../config/logger");

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || "INTERNAL_SERVER_ERROR";
  const message = err.message || "An unexpected error occurred.";
  const errors = err.errors || null;

  logger.error({
    message: err.message,
    stack: err.stack,
    requestId: req.id,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip
  });

  return ApiResponse.error(res, statusCode, message, errorCode, errors);
}

module.exports = errorHandler;