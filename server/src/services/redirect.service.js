const UrlRepository = require("../repositories/UrlRepository");
const ClickRepository = require("../repositories/ClickRepository");
const { parseUserAgent } = require("../utils/userAgent");
const { lookupIpLocation } = require("../utils/geoip");
const { comparePassword } = require("../utils/password");

const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");

class RedirectService {
  async handleRedirect(code, reqInfo) {
    const urlRecord = await UrlRepository.findByShortCodeOrAlias(code);
    if (!urlRecord) {
      throw new NotFoundError("Short URL not found.", "URL_NOT_FOUND");
    }

    if (!urlRecord.is_active) {
      throw new ForbiddenError("This short URL has been disabled by its owner.", "URL_DISABLED");
    }

    if (urlRecord.expires_at && new Date(urlRecord.expires_at) < new Date()) {
      throw new BadRequestError("This short URL has expired.", "URL_EXPIRED");
    }

    if (urlRecord.max_clicks && urlRecord.click_count >= urlRecord.max_clicks) {
      throw new ForbiddenError("This short URL has reached its maximum click limit.", "URL_MAX_CLICKS_REACHED");
    }

    if (urlRecord.password_hash) {
      return {
        isPasswordProtected: true,
        short_code: urlRecord.short_code,
        title: urlRecord.title || "Password Protected Link"
      };
    }

    // Record click analytics asynchronously
    this.recordClickAnalytics(urlRecord.id, reqInfo).catch(err => {
      console.error("Failed to record click analytics:", err.message);
    });

    // Increment click counter
    const incrementResult = await UrlRepository.incrementClickCount(urlRecord.id);
    if (incrementResult.affectedRows === 0) {
      throw new ForbiddenError("This short URL has reached its maximum click limit.", "URL_MAX_CLICKS_REACHED");
    }

    return {
      isPasswordProtected: false,
      original_url: urlRecord.original_url
    };
  }

  async verifyPasswordAndRedirect(code, password, reqInfo) {
    const urlRecord = await UrlRepository.findByShortCodeOrAlias(code);
    if (!urlRecord) {
      throw new NotFoundError("Short URL not found.", "URL_NOT_FOUND");
    }

    if (!urlRecord.is_active) {
      throw new ForbiddenError("This short URL has been disabled.", "URL_DISABLED");
    }

    if (urlRecord.expires_at && new Date(urlRecord.expires_at) < new Date()) {
      throw new BadRequestError("This short URL has expired.", "URL_EXPIRED");
    }

    if (urlRecord.max_clicks && urlRecord.click_count >= urlRecord.max_clicks) {
      throw new ForbiddenError("This short URL has reached its maximum click limit.", "URL_MAX_CLICKS_REACHED");
    }

    if (!urlRecord.password_hash) {
      return { original_url: urlRecord.original_url };
    }

    if (!password) {
      throw new BadRequestError("Password is required to access this URL.", "PASSWORD_REQUIRED");
    }

    const isMatch = await comparePassword(password, urlRecord.password_hash);
    if (!isMatch) {
      throw new UnauthorizedError("Incorrect password for short URL.", "INVALID_URL_PASSWORD");
    }

    // Record click analytics
    this.recordClickAnalytics(urlRecord.id, reqInfo).catch(err => {
      console.error("Failed to record click analytics:", err.message);
    });

    const incrementResult = await UrlRepository.incrementClickCount(urlRecord.id);
    if (incrementResult.affectedRows === 0) {
      throw new ForbiddenError("This short URL has reached its maximum click limit.", "URL_MAX_CLICKS_REACHED");
    }

    return { original_url: urlRecord.original_url };
  }

  async recordClickAnalytics(urlId, { ip, userAgent, referrer, requestId }) {
    const { browser, os, device } = parseUserAgent(userAgent);
    const { country, city } = lookupIpLocation(ip);

    await ClickRepository.recordClick({
      url_id: urlId,
      ip_address: ip || '127.0.0.1',
      browser,
      operating_system: os,
      device,
      country,
      city,
      referrer: referrer || 'Direct',
      request_id: requestId
    });
  }
}

module.exports = new RedirectService();
