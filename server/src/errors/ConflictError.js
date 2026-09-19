const AppError = require("./AppError");

class ConflictError extends AppError {
  constructor(message = "Conflict", errorCode = "RESOURCE_CONFLICT") {
    super(message, 409, errorCode);
  }
}

module.exports = ConflictError;