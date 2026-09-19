const AdminService = require("../services/admin.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatusCodes");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

class AdminController {
  getUsers = asyncHandler(async (req, res) => {
    const { search, role, page, limit } = req.query;
    const result = await AdminService.getUsers({ search, role, page, limit });
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, result);
  });

  updateUserStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { is_active } = req.body;
    const result = await AdminService.updateUserStatus(id, is_active, req.user.id, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, "User status updated successfully", result);
  });

  updateUserRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const result = await AdminService.updateUserRole(id, role, req.user.id, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, "User role updated successfully", result);
  });

  deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await AdminService.deleteUser(id, req.user.id, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, "User deleted successfully");
  });

  getAllUrls = asyncHandler(async (req, res) => {
    const { search, status, page, limit } = req.query;
    const result = await AdminService.getAllUrls({ search, status, page, limit });
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, result);
  });

  deleteUrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await AdminService.deleteUrl(id, req.user.id, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.URL_DELETED);
  });

  getAuditLogs = asyncHandler(async (req, res) => {
    const { action, page, limit } = req.query;
    const result = await AdminService.getAuditLogs({ action, page, limit });
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, result);
  });

  getGlobalSystemStats = asyncHandler(async (req, res) => {
    const result = await AdminService.getGlobalSystemStats();
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, result);
  });
}

module.exports = new AdminController();
