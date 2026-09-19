const RedirectService = require("../services/redirect.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatusCodes");
const env = require("../config/env");

class RedirectController {
  // GET /:shortCode (Direct browser navigation)
  handleWebRedirect = asyncHandler(async (req, res) => {
    const { shortCode } = req.params;
    const reqInfo = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      referrer: req.headers["referer"] || req.headers["referrer"],
      requestId: req.id
    };

    const result = await RedirectService.handleRedirect(shortCode, reqInfo);

    if (result.isPasswordProtected) {
      // Redirect to frontend password entry page
      return res.redirect(`${env.app.clientUrl}/p/${result.short_code}`);
    }

    return res.redirect(result.original_url);
  });

  // GET /api/v1/redirect/:shortCode (API info check)
  getRedirectInfo = asyncHandler(async (req, res) => {
    const { shortCode } = req.params;
    const reqInfo = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      referrer: req.headers["referer"] || req.headers["referrer"],
      requestId: req.id
    };

    const result = await RedirectService.handleRedirect(shortCode, reqInfo);
    return ApiResponse.success(res, HTTP_STATUS.OK, "Redirect information retrieved", result);
  });

  // POST /api/v1/redirect/:shortCode/verify (Password verification)
  verifyPassword = asyncHandler(async (req, res) => {
    const { shortCode } = req.params;
    const { password } = req.body;
    const reqInfo = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      referrer: req.headers["referer"] || req.headers["referrer"],
      requestId: req.id
    };

    const result = await RedirectService.verifyPasswordAndRedirect(shortCode, password, reqInfo);
    return ApiResponse.success(res, HTTP_STATUS.OK, "Password verified successfully", result);
  });
}

module.exports = new RedirectController();
