const BaseRepository = require("./BaseRepository");

class AuditLogRepository extends BaseRepository {
  async create({ user_id, action, details, ip_address, request_id }) {
    const result = await this.query(
      `INSERT INTO audit_logs (user_id, action, details, ip_address, request_id)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id || null, action, details || null, ip_address || null, request_id || null]
    );
    return result.insertId;
  }

  async findAll({ page = 1, limit = 20, action = null }) {
    const offset = (page - 1) * limit;
    let sql = `
      SELECT a.id, a.user_id, a.action, a.details, a.ip_address, a.request_id, a.created_at, u.email, u.first_name, u.last_name
      FROM audit_logs a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (action) {
      sql += ` AND a.action = ?`;
      params.push(action);
    }

    sql += ` ORDER BY a.created_at DESC LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    return this.query(sql, params);
  }

  async countAll({ action = null }) {
    let sql = `SELECT COUNT(*) as total FROM audit_logs WHERE 1=1`;
    const params = [];

    if (action) {
      sql += ` AND action = ?`;
      params.push(action);
    }

    const res = await this.findOne(sql, params);
    return res ? res.total : 0;
  }
}

module.exports = new AuditLogRepository();
