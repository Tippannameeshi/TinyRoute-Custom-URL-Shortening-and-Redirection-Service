class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(res, statusCode = 200, message = "Success", data = null) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static error(res, statusCode = 500, message = "Error", errorCode = "INTERNAL_ERROR", errors = null) {
    return res.status(statusCode).json({
      success: false,
      errorCode,
      message,
      errors
    });
  }
}

module.exports = ApiResponse;