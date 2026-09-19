const AppError = require("./AppError");

class ForbiddenError extends AppError {
  constructor(message = "Forbidden", errorCode = "FORBIDDEN_ACCESS") {
    super(message, 403, errorCode);
  }
}

module.exports = ForbiddenError;