const UserService = require("../services/user.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatusCodes");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

class UserController {
  getSettings = asyncHandler(async (req, res) => {
    const result = await UserService.getSettings(req.user.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, result);
  });

  updateSettings = asyncHandler(async (req, res) => {
    const result = await UserService.updateSettings(req.user.id, req.body);
    return ApiResponse.success(res, HTTP_STATUS.OK, "Settings updated successfully", result);
  });
}

module.exports = new UserController();
