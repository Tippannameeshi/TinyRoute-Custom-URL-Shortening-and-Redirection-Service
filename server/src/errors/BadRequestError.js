const AppError = require("./AppError");

class BadRequestError extends AppError {
  constructor(message = "Bad Request", errorCode = "BAD_REQUEST", errors = null) {
    super(message, 400, errorCode, errors);
  }
}

module.exports = BadRequestError;