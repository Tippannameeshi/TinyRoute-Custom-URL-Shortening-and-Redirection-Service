const ClickRepository = require("../repositories/ClickRepository");
const UrlRepository = require("../repositories/UrlRepository");
const { getCache, setCache } = require("../utils/cache");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

class AnalyticsService {
  async getUrlAnalytics(urlId, userId, range = '30d') {
    const url = await UrlRepository.findById(urlId);
    if (!url) throw new NotFoundError("Short URL not found.");

    if (userId && url.user_id !== userId) {
      throw new ForbiddenError("You do not have permission to view analytics for this URL.");
    }

    const [clicksTrend, browsers, devices, osList, countries, referrers, recentVisitors] = await Promise.all([
      ClickRepository.getClicksByDate({ urlId, range }),
      ClickRepository.getBrowserStats({ urlId }),
      ClickRepository.getDeviceStats({ urlId }),
      ClickRepository.getOSStats({ urlId }),
      ClickRepository.getCountryStats({ urlId }),
      ClickRepository.getReferrerStats({ urlId }),
      ClickRepository.getRecentVisitors({ urlId, limit: 15 })
    ]);

    return {
      url,
      summary: {
        totalClicks: url.click_count,
        maxClicks: url.max_clicks,
        isExpired: url.expires_at ? new Date(url.expires_at) < new Date() : false,
        isActive: url.is_active
      },
      charts: {
        clicksTrend,
        browsers,
        devices,
        osList,
        countries,
        referrers
      },
      recentVisitors
    };
  }

  async getUserDashboardOverview(userId, range = '30d') {
    const cacheKey = `dashboard_overview_user_${userId}_${range}`;
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const [stats, clicksTrend, browsers, devices, osList, countries, referrers, recentVisitors] = await Promise.all([
      UrlRepository.getDashboardStats(userId),
      ClickRepository.getClicksByDate({ userId, range }),
      ClickRepository.getBrowserStats({ userId }),
      ClickRepository.getDeviceStats({ userId }),
      ClickRepository.getOSStats({ userId }),
      ClickRepository.getCountryStats({ userId }),
      ClickRepository.getReferrerStats({ userId }),
      ClickRepository.getRecentVisitors({ userId, limit: 10 })
    ]);

    const overview = {
      stats,
      charts: {
        clicksTrend,
        browsers,
        devices,
        osList,
        countries,
        referrers
      },
      recentVisitors
    };

    setCache(cacheKey, overview, 60); // Cache for 60 seconds
    return overview;
  }
}

module.exports = new AnalyticsService();
