const express = require("express");
const UrlController = require("../controllers/url.controller");
const QrService = require("../services/qr.service");
const UrlService = require("../services/url.service");
const { authenticate } = require("../middleware/auth.middleware");
const {
  createUrlValidator,
  bulkCreateUrlValidator,
  updateUrlValidator,
} = require("../validators/url.validator");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const HTTP_STATUS = require("../constants/httpStatusCodes");
const { buildShortUrl } = require("../helpers/url.helper");

const router = express.Router();

router.use(authenticate);

router.post("/", createUrlValidator, UrlController.createUrl);
router.post("/bulk", bulkCreateUrlValidator, UrlController.bulkCreateUrls);
router.get("/", UrlController.getUrls);
router.get("/:id", UrlController.getUrlById);
router.put("/:id", updateUrlValidator, UrlController.updateUrl);
router.delete("/:id", UrlController.deleteUrl);

router.patch("/:id/toggle-status", UrlController.toggleStatus);
router.patch("/:id/toggle-favorite", UrlController.toggleFavorite);

// QR Code endpoints (PNG & SVG download)
router.get(
  "/:id/qr",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const format = req.query.format || "png";
    const urlRecord = await UrlService.getUrlById(id, req.user.id);
    const targetShortUrl = buildShortUrl(
      urlRecord.short_code,
      urlRecord.custom_alias,
    );

    if (format === "svg") {
      const svgString = await QrService.generateSvgString(targetShortUrl);
      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="qr_${urlRecord.short_code}.svg"`,
      );
      return res.send(svgString);
    }

    const dataUrl = await QrService.generateDataUrl(targetShortUrl);
    return ApiResponse.success(
      res,
      HTTP_STATUS.OK,
      "QR code generated successfully",
      { dataUrl, shortUrl: targetShortUrl },
    );
  }),
);

module.exports = router;
