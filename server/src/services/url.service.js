const UrlRepository = require("../repositories/UrlRepository");
const AuditLogRepository = require("../repositories/AuditLogRepository");
const { generateRandomShortCode, encodeBase62 } = require("../utils/base62");
const { hashPassword } = require("../utils/password");
const { buildShortUrl } = require("../helpers/url.helper");
const { auditLogger } = require("../config/logger");

const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

class UrlService {
  async createUrl(userId, data, ipAddress, requestId) {
    let custom_alias = data.custom_alias ? data.custom_alias.trim() : null;

    if (custom_alias) {
      const existingAlias = await UrlRepository.findByCustomAlias(custom_alias);
      if (existingAlias) {
        throw new ConflictError("Custom alias is already taken.", "ALIAS_IN_USE");
      }
    }

    // Auto-generate short code using Base62 with collision resolution
    let short_code = null;
    let attempts = 0;
    const maxAttempts = 10;

    while (!short_code && attempts < maxAttempts) {
      attempts++;
      const candidateCode = generateRandomShortCode(6);
      const existing = await UrlRepository.findByShortCode(candidateCode);
      if (!existing) {
        short_code = candidateCode;
      }
    }

    if (!short_code) {
      throw new BadRequestError("Failed to generate unique short code. Please try again.", "CODE_GENERATION_FAILED");
    }

    let password_hash = null;
    if (data.password) {
      password_hash = await hashPassword(data.password);
    }

    const urlId = await UrlRepository.create({
      user_id: userId,
      original_url: data.original_url,
      short_code,
      custom_alias,
      title: data.title || null,
      description: data.description || null,
      tags: data.tags || [],
      is_favorite: data.is_favorite || false,
      max_clicks: data.max_clicks ? Number(data.max_clicks) : null,
      password_hash,
      expires_at: data.expires_at || null,
      is_active: data.is_active !== undefined ? data.is_active : true
    });

    const createdUrl = await UrlRepository.findById(urlId);

    await AuditLogRepository.create({
      user_id: userId,
      action: "CREATE_URL",
      details: `Created short URL: ${createdUrl.short_code}`,
      ip_address: ipAddress,
      request_id: requestId
    });
    auditLogger.info({ action: "CREATE_URL", userId, shortCode: createdUrl.short_code, ipAddress, requestId });

    return {
      ...createdUrl,
      short_url: buildShortUrl(createdUrl.short_code, createdUrl.custom_alias)
    };
  }

  async bulkCreateUrls(userId, urlsArray, ipAddress, requestId) {
    if (!Array.isArray(urlsArray) || urlsArray.length === 0) {
      throw new BadRequestError("An array of URLs is required for bulk creation.", "INVALID_BULK_INPUT");
    }

    const createdList = [];
    for (const item of urlsArray) {
      const created = await this.createUrl(userId, item, ipAddress, requestId);
      createdList.push(created);
    }

    return createdList;
  }

  async getUrls(userId, params) {
    const urls = await UrlRepository.findAll({ userId, ...params });
    const total = await UrlRepository.countAll({ userId, ...params });

    const formattedUrls = urls.map(u => ({
      ...u,
      short_url: buildShortUrl(u.short_code, u.custom_alias)
    }));

    return {
      urls: formattedUrls,
      pagination: {
        page: Number(params.page || 1),
        limit: Number(params.limit || 10),
        total,
        totalPages: Math.ceil(total / Number(params.limit || 10))
      }
    };
  }

  async getUrlById(id, userId) {
    const url = await UrlRepository.findById(id);
    if (!url) throw new NotFoundError("Short URL not found.");

    if (userId && url.user_id !== userId) {
      throw new ForbiddenError("You do not have permission to view this URL.");
    }

    return {
      ...url,
      short_url: buildShortUrl(url.short_code, url.custom_alias)
    };
  }

  async updateUrl(id, userId, data, ipAddress, requestId) {
    const existing = await UrlRepository.findById(id);
    if (!existing) throw new NotFoundError("Short URL not found.");

    if (existing.user_id !== userId) {
      throw new ForbiddenError("You do not have permission to edit this URL.");
    }

    if (data.custom_alias && data.custom_alias !== existing.custom_alias) {
      const aliasOccupied = await UrlRepository.findByCustomAlias(data.custom_alias);
      if (aliasOccupied) {
        throw new ConflictError("Custom alias is already taken.", "ALIAS_IN_USE");
      }
    }

    let password_hash = undefined;
    if (data.password !== undefined) {
      password_hash = data.password ? await hashPassword(data.password) : null;
    }

    const updated = await UrlRepository.update(id, userId, {
      ...data,
      password_hash
    });

    await AuditLogRepository.create({
      user_id: userId,
      action: "UPDATE_URL",
      details: `Updated short URL id: ${id}`,
      ip_address: ipAddress,
      request_id: requestId
    });

    return {
      ...updated,
      short_url: buildShortUrl(updated.short_code, updated.custom_alias)
    };
  }

  async deleteUrl(id, userId, ipAddress, requestId) {
    const existing = await UrlRepository.findById(id);
    if (!existing) throw new NotFoundError("Short URL not found.");

    if (existing.user_id !== userId) {
      throw new ForbiddenError("You do not have permission to delete this URL.");
    }

    await UrlRepository.softDelete(id, userId);

    await AuditLogRepository.create({
      user_id: userId,
      action: "DELETE_URL",
      details: `Soft-deleted short URL code: ${existing.short_code}`,
      ip_address: ipAddress,
      request_id: requestId
    });
  }

  async toggleStatus(id, userId) {
    const existing = await UrlRepository.findById(id);
    if (!existing) throw new NotFoundError("Short URL not found.");

    if (existing.user_id !== userId) {
      throw new ForbiddenError("You do not have permission to modify this URL.");
    }

    const updated = await UrlRepository.toggleStatus(id, userId);
    return {
      ...updated,
      short_url: buildShortUrl(updated.short_code, updated.custom_alias)
    };
  }

  async toggleFavorite(id, userId) {
    const existing = await UrlRepository.findById(id);
    if (!existing) throw new NotFoundError("Short URL not found.");

    if (existing.user_id !== userId) {
      throw new ForbiddenError("You do not have permission to modify this URL.");
    }

    const updated = await UrlRepository.toggleFavorite(id, userId);
    return {
      ...updated,
      short_url: buildShortUrl(updated.short_code, updated.custom_alias)
    };
  }
}

module.exports = new UrlService();
