const UserRepository = require("../repositories/UserRepository");
const UrlRepository = require("../repositories/UrlRepository");
const ClickRepository = require("../repositories/ClickRepository");
const AuditLogRepository = require("../repositories/AuditLogRepository");
const { buildShortUrl } = require("../helpers/url.helper");
const { auditLogger } = require("../config/logger");

const NotFoundError = require("../errors/NotFoundError");

class AdminService {
  async getUsers(params) {
    const users = await UserRepository.findAll(params);
    const total = await UserRepository.countAll(params);

    return {
      users,
      pagination: {
        page: Number(params.page || 1),
        limit: Number(params.limit || 10),
        total,
        totalPages: Math.ceil(total / Number(params.limit || 10))
      }
    };
  }

  async updateUserStatus(targetUserId, isActive, adminUserId, ipAddress, requestId) {
    const user = await UserRepository.findById(targetUserId);
    if (!user) throw new NotFoundError("User not found.");

    const updated = await UserRepository.updateUserStatus(targetUserId, isActive);

    await AuditLogRepository.create({
      user_id: adminUserId,
      action: "ADMIN_ACTIONS",
      details: `Admin updated user ${targetUserId} status to active=${isActive}`,
      ip_address: ipAddress,
      request_id: requestId
    });
    auditLogger.info({ action: "ADMIN_UPDATE_USER_STATUS", adminUserId, targetUserId, isActive, ipAddress, requestId });

    return updated;
  }

  async updateUserRole(targetUserId, role, adminUserId, ipAddress, requestId) {
    const user = await UserRepository.findById(targetUserId);
    if (!user) throw new NotFoundError("User not found.");

    const updated = await UserRepository.updateUserRole(targetUserId, role);

    await AuditLogRepository.create({
      user_id: adminUserId,
      action: "ADMIN_ACTIONS",
      details: `Admin updated user ${targetUserId} role to ${role}`,
      ip_address: ipAddress,
      request_id: requestId
    });

    return updated;
  }

  async deleteUser(targetUserId, adminUserId, ipAddress, requestId) {
    const user = await UserRepository.findById(targetUserId);
    if (!user) throw new NotFoundError("User not found.");

    await UserRepository.deleteUser(targetUserId);

    await AuditLogRepository.create({
      user_id: adminUserId,
      action: "ADMIN_ACTIONS",
      details: `Admin deleted user id ${targetUserId}`,
      ip_address: ipAddress,
      request_id: requestId
    });
  }

  async getAllUrls(params) {
    const urls = await UrlRepository.findAll(params);
    const total = await UrlRepository.countAll(params);

    const formatted = urls.map(u => ({
      ...u,
      short_url: buildShortUrl(u.short_code, u.custom_alias)
    }));

    return {
      urls: formatted,
      pagination: {
        page: Number(params.page || 1),
        limit: Number(params.limit || 10),
        total,
        totalPages: Math.ceil(total / Number(params.limit || 10))
      }
    };
  }

  async deleteUrl(urlId, adminUserId, ipAddress, requestId) {
    const url = await UrlRepository.findById(urlId);
    if (!url) throw new NotFoundError("Short URL not found.");

    await UrlRepository.softDelete(urlId);

    await AuditLogRepository.create({
      user_id: adminUserId,
      action: "ADMIN_ACTIONS",
      details: `Admin deleted URL id ${urlId}`,
      ip_address: ipAddress,
      request_id: requestId
    });
  }

  async getAuditLogs(params) {
    const logs = await AuditLogRepository.findAll(params);
    const total = await AuditLogRepository.countAll(params);

    return {
      logs,
      pagination: {
        page: Number(params.page || 1),
        limit: Number(params.limit || 20),
        total,
        totalPages: Math.ceil(total / Number(params.limit || 20))
      }
    };
  }

  async getGlobalSystemStats() {
    const [stats, totalUsers, clicksTrend, browsers, devices, osList, countries] = await Promise.all([
      UrlRepository.getDashboardStats(null),
      UserRepository.countAll({}),
      ClickRepository.getClicksByDate({ range: '30d' }),
      ClickRepository.getBrowserStats({}),
      ClickRepository.getDeviceStats({}),
      ClickRepository.getOSStats({}),
      ClickRepository.getCountryStats({})
    ]);

    return {
      stats: {
        ...stats,
        total_users: totalUsers
      },
      charts: {
        clicksTrend,
        browsers,
        devices,
        osList,
        countries
      }
    };
  }
}

module.exports = new AdminService();
