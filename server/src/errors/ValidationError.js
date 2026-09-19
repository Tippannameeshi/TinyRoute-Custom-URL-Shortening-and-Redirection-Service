const AppError = require("./AppError");

class ValidationError extends AppError {
  constructor(errors = [], message = "Validation Failed", errorCode = "VALIDATION_ERROR") {
    super(message, 422, errorCode, errors);
  }
}

module.exports = ValidationError;