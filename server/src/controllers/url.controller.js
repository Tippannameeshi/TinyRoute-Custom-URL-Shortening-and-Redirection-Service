const UrlService = require("../services/url.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatusCodes");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

class UrlController {
  createUrl = asyncHandler(async (req, res) => {
    const result = await UrlService.createUrl(req.user.id, req.body, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.CREATED, RESPONSE_MESSAGES.URL_CREATED, result);
  });

  bulkCreateUrls = asyncHandler(async (req, res) => {
    const { urls } = req.body;
    const result = await UrlService.bulkCreateUrls(req.user.id, urls, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.CREATED, RESPONSE_MESSAGES.BULK_URL_CREATED, result);
  });

  getUrls = asyncHandler(async (req, res) => {
    const { search, status, is_favorite, sortBy, sortOrder, page, limit } = req.query;
    const result = await UrlService.getUrls(req.user.id, {
      search,
      status,
      is_favorite,
      sortBy,
      sortOrder,
      page,
      limit
    });
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, result);
  });

  getUrlById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await UrlService.getUrlById(id, req.user.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, result);
  });

  updateUrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await UrlService.updateUrl(id, req.user.id, req.body, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.URL_UPDATED, result);
  });

  deleteUrl = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await UrlService.deleteUrl(id, req.user.id, req.ip, req.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.URL_DELETED);
  });

  toggleStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await UrlService.toggleStatus(id, req.user.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.URL_STATUS_TOGGLED, result);
  });

  toggleFavorite = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await UrlService.toggleFavorite(id, req.user.id);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, result);
  });
}

module.exports = new UrlController();
