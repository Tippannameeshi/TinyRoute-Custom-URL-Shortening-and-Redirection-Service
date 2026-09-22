const BaseRepository = require("./BaseRepository");

class UrlRepository extends BaseRepository {
  async create(urlData) {
    const tagsJson = urlData.tags ? JSON.stringify(urlData.tags) : null;
    const result = await this.query(
      `INSERT INTO urls (
        user_id, original_url, short_code, custom_alias, title, description,
        tags, is_favorite, max_clicks, password_hash, expires_at, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        urlData.user_id,
        urlData.original_url,
        urlData.short_code,
        urlData.custom_alias || null,
        urlData.title || null,
        urlData.description || null,
        tagsJson,
        urlData.is_favorite || false,
        urlData.max_clicks || null,
        urlData.password_hash || null,
        urlData.expires_at || null,
        urlData.is_active !== undefined ? urlData.is_active : true
      ]
    );
    return result.insertId;
  }

  async findById(id) {
    return this.findOne(
      `SELECT * FROM urls WHERE id = ? AND deleted_at IS NULL`,
      [id]
    );
  }

  async findByShortCodeOrAlias(code) {
    return this.findOne(
      `SELECT * FROM urls WHERE (short_code = ? OR custom_alias = ?) AND deleted_at IS NULL`,
      [code, code]
    );
  }

  async findByShortCode(short_code) {
    return this.findOne(
      `SELECT * FROM urls WHERE short_code = ? AND deleted_at IS NULL`,
      [short_code]
    );
  }

  async findByCustomAlias(custom_alias) {
    return this.findOne(
      `SELECT * FROM urls WHERE custom_alias = ? AND deleted_at IS NULL`,
      [custom_alias]
    );
  }

  async update(id, userId, updateData) {
    const tagsJson = updateData.tags ? JSON.stringify(updateData.tags) : undefined;
    
    let sql = `UPDATE urls SET `;
    const fields = [];
    const params = [];

    if (updateData.title !== undefined) { fields.push(`title = ?`); params.push(updateData.title); }
    if (updateData.description !== undefined) { fields.push(`description = ?`); params.push(updateData.description); }
    if (updateData.original_url !== undefined) { fields.push(`original_url = ?`); params.push(updateData.original_url); }
    if (updateData.custom_alias !== undefined) { fields.push(`custom_alias = ?`); params.push(updateData.custom_alias || null); }
    if (tagsJson !== undefined) { fields.push(`tags = ?`); params.push(tagsJson); }
    if (updateData.is_favorite !== undefined) { fields.push(`is_favorite = ?`); params.push(updateData.is_favorite); }
    if (updateData.max_clicks !== undefined) { fields.push(`max_clicks = ?`); params.push(updateData.max_clicks || null); }
    if (updateData.password_hash !== undefined) { fields.push(`password_hash = ?`); params.push(updateData.password_hash); }
    if (updateData.expires_at !== undefined) { fields.push(`expires_at = ?`); params.push(updateData.expires_at || null); }
    if (updateData.is_active !== undefined) { fields.push(`is_active = ?`); params.push(updateData.is_active); }

    if (fields.length === 0) return this.findById(id);

    sql += fields.join(', ') + ` WHERE id = ?`;
    params.push(id);

    if (userId) {
      sql += ` AND user_id = ?`;
      params.push(userId);
    }

    await this.query(sql, params);
    return this.findById(id);
  }

  async softDelete(id, userId = null) {
    let sql = `UPDATE urls SET deleted_at = NOW() WHERE id = ?`;
    const params = [id];
    if (userId) {
      sql += ` AND user_id = ?`;
      params.push(userId);
    }
    await this.query(sql, params);
  }

  async toggleStatus(id, userId = null) {
    let sql = `UPDATE urls SET is_active = NOT is_active WHERE id = ?`;
    const params = [id];
    if (userId) {
      sql += ` AND user_id = ?`;
      params.push(userId);
    }
    await this.query(sql, params);
    return this.findById(id);
  }

  async toggleFavorite(id, userId) {
    await this.query(
      `UPDATE urls SET is_favorite = NOT is_favorite WHERE id = ? AND user_id = ?`,
      [id, userId]
    );
    return this.findById(id);
  }

  async incrementClickCount(id) {
    return this.query(
      `UPDATE urls
       SET click_count = click_count + 1
       WHERE id = ? AND (max_clicks IS NULL OR click_count < max_clicks)`,
      [id]
    );
  }

  async findAll({ userId = null, search = '', status = null, is_favorite = null, sortBy = 'created_at', sortOrder = 'DESC', page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    let sql = `SELECT * FROM urls WHERE deleted_at IS NULL`;
    const params = [];

    if (userId) {
      sql += ` AND user_id = ?`;
      params.push(userId);
    }

    if (search) {
      sql += ` AND (title LIKE ? OR original_url LIKE ? OR short_code LIKE ? OR custom_alias LIKE ?)`;
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    if (status === 'active') {
      sql += ` AND is_active = TRUE AND (expires_at IS NULL OR expires_at > NOW())`;
    } else if (status === 'expired') {
      sql += ` AND expires_at <= NOW()`;
    } else if (status === 'disabled') {
      sql += ` AND is_active = FALSE`;
    }

    if (is_favorite !== null && is_favorite !== undefined) {
      sql += ` AND is_favorite = ?`;
      params.push(Boolean(is_favorite));
    }

    const allowedSortFields = ['created_at', 'click_count', 'title', 'expires_at'];
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'created_at';
    const safeOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    sql += ` ORDER BY ${safeSortBy} ${safeOrder} LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    return this.query(sql, params);
  }

  async countAll({ userId = null, search = '', status = null, is_favorite = null }) {
    let sql = `SELECT COUNT(*) as total FROM urls WHERE deleted_at IS NULL`;
    const params = [];

    if (userId) {
      sql += ` AND user_id = ?`;
      params.push(userId);
    }

    if (search) {
      sql += ` AND (title LIKE ? OR original_url LIKE ? OR short_code LIKE ? OR custom_alias LIKE ?)`;
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    if (status === 'active') {
      sql += ` AND is_active = TRUE AND (expires_at IS NULL OR expires_at > NOW())`;
    } else if (status === 'expired') {
      sql += ` AND expires_at <= NOW()`;
    } else if (status === 'disabled') {
      sql += ` AND is_active = FALSE`;
    }

    if (is_favorite !== null && is_favorite !== undefined) {
      sql += ` AND is_favorite = ?`;
      params.push(Boolean(is_favorite));
    }

    const result = await this.findOne(sql, params);
    return result ? result.total : 0;
  }

  async getDashboardStats(userId = null) {
    let sql = `
      SELECT 
        COUNT(*) as total_urls,
        SUM(click_count) as total_clicks,
        SUM(CASE WHEN is_active = TRUE AND (expires_at IS NULL OR expires_at > NOW()) THEN 1 ELSE 0 END) as active_urls,
        SUM(CASE WHEN expires_at <= NOW() THEN 1 ELSE 0 END) as expired_urls
      FROM urls
      WHERE deleted_at IS NULL
    `;
    const params = [];

    if (userId) {
      sql += ` AND user_id = ?`;
      params.push(userId);
    }

    const res = await this.findOne(sql, params);
    return {
      total_urls: Number(res.total_urls || 0),
      total_clicks: Number(res.total_clicks || 0),
      active_urls: Number(res.active_urls || 0),
      expired_urls: Number(res.expired_urls || 0)
    };
  }
}

module.exports = new UrlRepository();