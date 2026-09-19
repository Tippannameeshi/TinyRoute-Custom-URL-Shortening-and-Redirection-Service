const BaseRepository = require("./BaseRepository");

class ClickRepository extends BaseRepository {
  async recordClick({ url_id, ip_address, browser, operating_system, device, country, city, referrer, request_id }) {
    const result = await this.query(
      `INSERT INTO url_clicks (
        url_id, ip_address, browser, operating_system, device, country, city, referrer, request_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [url_id, ip_address, browser, operating_system, device, country, city, referrer, request_id]
    );
    return result.insertId;
  }

  async getClicksByDate({ urlId = null, userId = null, range = '30d' }) {
    let intervalDays = 30;
    if (range === '7d') intervalDays = 7;
    if (range === '90d') intervalDays = 90;

    let sql = `
      SELECT DATE(c.clicked_at) as date, COUNT(*) as clicks
      FROM url_clicks c
      JOIN urls u ON c.url_id = u.id
      WHERE c.clicked_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
    `;
    const params = [intervalDays];

    if (urlId) {
      sql += ` AND c.url_id = ?`;
      params.push(urlId);
    }
    if (userId) {
      sql += ` AND u.user_id = ?`;
      params.push(userId);
    }

    sql += ` GROUP BY DATE(c.clicked_at) ORDER BY date ASC`;
    return this.query(sql, params);
  }

  async getBrowserStats({ urlId = null, userId = null }) {
    let sql = `
      SELECT c.browser, COUNT(*) as count
      FROM url_clicks c
      JOIN urls u ON c.url_id = u.id
      WHERE 1=1
    `;
    const params = [];
    if (urlId) { sql += ` AND c.url_id = ?`; params.push(urlId); }
    if (userId) { sql += ` AND u.user_id = ?`; params.push(userId); }

    sql += ` GROUP BY c.browser ORDER BY count DESC LIMIT 10`;
    return this.query(sql, params);
  }

  async getDeviceStats({ urlId = null, userId = null }) {
    let sql = `
      SELECT c.device, COUNT(*) as count
      FROM url_clicks c
      JOIN urls u ON c.url_id = u.id
      WHERE 1=1
    `;
    const params = [];
    if (urlId) { sql += ` AND c.url_id = ?`; params.push(urlId); }
    if (userId) { sql += ` AND u.user_id = ?`; params.push(userId); }

    sql += ` GROUP BY c.device ORDER BY count DESC LIMIT 10`;
    return this.query(sql, params);
  }

  async getOSStats({ urlId = null, userId = null }) {
    let sql = `
      SELECT c.operating_system as os, COUNT(*) as count
      FROM url_clicks c
      JOIN urls u ON c.url_id = u.id
      WHERE 1=1
    `;
    const params = [];
    if (urlId) { sql += ` AND c.url_id = ?`; params.push(urlId); }
    if (userId) { sql += ` AND u.user_id = ?`; params.push(userId); }

    sql += ` GROUP BY c.operating_system ORDER BY count DESC LIMIT 10`;
    return this.query(sql, params);
  }

  async getCountryStats({ urlId = null, userId = null }) {
    let sql = `
      SELECT c.country, COUNT(*) as count
      FROM url_clicks c
      JOIN urls u ON c.url_id = u.id
      WHERE 1=1
    `;
    const params = [];
    if (urlId) { sql += ` AND c.url_id = ?`; params.push(urlId); }
    if (userId) { sql += ` AND u.user_id = ?`; params.push(userId); }

    sql += ` GROUP BY c.country ORDER BY count DESC LIMIT 10`;
    return this.query(sql, params);
  }

  async getReferrerStats({ urlId = null, userId = null }) {
    let sql = `
      SELECT c.referrer, COUNT(*) as count
      FROM url_clicks c
      JOIN urls u ON c.url_id = u.id
      WHERE 1=1
    `;
    const params = [];
    if (urlId) { sql += ` AND c.url_id = ?`; params.push(urlId); }
    if (userId) { sql += ` AND u.user_id = ?`; params.push(userId); }

    sql += ` GROUP BY c.referrer ORDER BY count DESC LIMIT 10`;
    return this.query(sql, params);
  }

  async getRecentVisitors({ urlId = null, userId = null, limit = 10 }) {
    let sql = `
      SELECT c.id, c.ip_address, c.browser, c.operating_system as os, c.device, c.country, c.city, c.referrer, c.clicked_at, u.short_code, u.title
      FROM url_clicks c
      JOIN urls u ON c.url_id = u.id
      WHERE 1=1
    `;
    const params = [];
    if (urlId) { sql += ` AND c.url_id = ?`; params.push(urlId); }
    if (userId) { sql += ` AND u.user_id = ?`; params.push(userId); }

    sql += ` ORDER BY c.clicked_at DESC LIMIT ?`;
    params.push(Number(limit));

    return this.query(sql, params);
  }
}

module.exports = new ClickRepository();