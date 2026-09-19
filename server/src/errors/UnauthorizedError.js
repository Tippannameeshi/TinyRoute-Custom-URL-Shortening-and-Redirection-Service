const AppError = require("./AppError");

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized Access", errorCode = "UNAUTHORIZED") {
    super(message, 401, errorCode);
  }
}

module.exports = UnauthorizedError;