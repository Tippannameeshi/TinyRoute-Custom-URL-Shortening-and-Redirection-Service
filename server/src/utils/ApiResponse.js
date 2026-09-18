class ApiResponse {
  static success(
    res,
    message = "Success",
    data = null,
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static created(
    res,
    message = "Created Successfully",
    data = null
  ) {
    return res.status(201).json({
      success: true,
      message,
      data
    });
  }

  static error(
    res,
    message = "Internal Server Error",
    errors = [],
    statusCode = 500
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  }
}

module.exports = ApiResponse;