const AnalyticsService = require("../services/analytics.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatusCodes");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

class AnalyticsController {
  getUrlAnalytics = asyncHandler(async (req, res) => {
    const { urlId } = req.params;
    const { range } = req.query;
    const result = await AnalyticsService.getUrlAnalytics(urlId, req.user.id, range);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, result);
  });

  getDashboardOverview = asyncHandler(async (req, res) => {
    const { range } = req.query;
    const result = await AnalyticsService.getUserDashboardOverview(req.user.id, range);
    return ApiResponse.success(res, HTTP_STATUS.OK, RESPONSE_MESSAGES.SUCCESS, result);
  });
}

module.exports = new AnalyticsController();
