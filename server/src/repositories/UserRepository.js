const BaseRepository = require("./BaseRepository");

class UserRepository extends BaseRepository {
  async create(user) {
    const result = await this.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, role, is_verified, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.first_name,
        user.last_name,
        user.email,
        user.password_hash,
        user.role || 'USER',
        user.is_verified || false,
        user.is_active !== undefined ? user.is_active : true
      ]
    );
    const userId = result.insertId;

    // Create default settings row
    await this.query(
      `INSERT INTO user_settings (user_id) VALUES (?)`,
      [userId]
    );

    return userId;
  }

  async findByEmail(email) {
    return this.findOne(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
  }

  async findById(id) {
    return this.findOne(
      `SELECT u.id, u.first_name, u.last_name, u.email, u.role, u.is_verified, u.is_active, u.last_login_at, u.created_at, u.updated_at,
              s.default_domain, s.notify_on_click, s.notify_on_expiration, s.theme
       FROM users u
       LEFT JOIN user_settings s ON u.id = s.user_id
       WHERE u.id = ?`,
      [id]
    );
  }

  async updateProfile(id, { first_name, last_name }) {
    await this.query(
      `UPDATE users SET first_name = ?, last_name = ? WHERE id = ?`,
      [first_name, last_name, id]
    );
    return this.findById(id);
  }

  async updatePassword(id, password_hash) {
    await this.query(
      `UPDATE users SET password_hash = ? WHERE id = ?`,
      [password_hash, id]
    );
  }

  async updateLastLogin(id) {
    await this.query(
      `UPDATE users SET last_login_at = NOW() WHERE id = ?`,
      [id]
    );
  }

  async updateVerificationStatus(id, is_verified = true) {
    await this.query(
      `UPDATE users SET is_verified = ? WHERE id = ?`,
      [is_verified, id]
    );
  }

  async updateUserStatus(id, is_active) {
    await this.query(
      `UPDATE users SET is_active = ? WHERE id = ?`,
      [is_active, id]
    );
    return this.findById(id);
  }

  async updateUserRole(id, role) {
    await this.query(
      `UPDATE users SET role = ? WHERE id = ?`,
      [role, id]
    );
    return this.findById(id);
  }

  async deleteUser(id) {
    await this.query(`DELETE FROM users WHERE id = ?`, [id]);
  }

  async findAll({ search = '', role = null, page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    let sql = `SELECT id, first_name, last_name, email, role, is_verified, is_active, last_login_at, created_at FROM users WHERE 1=1`;
    const params = [];

    if (search) {
      sql += ` AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)`;
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (role) {
      sql += ` AND role = ?`;
      params.push(role);
    }

    sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    return this.query(sql, params);
  }

  async countAll({ search = '', role = null }) {
    let sql = `SELECT COUNT(*) as total FROM users WHERE 1=1`;
    const params = [];

    if (search) {
      sql += ` AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)`;
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (role) {
      sql += ` AND role = ?`;
      params.push(role);
    }

    const result = await this.findOne(sql, params);
    return result ? result.total : 0;
  }

  async updateSettings(userId, { default_domain, notify_on_click, notify_on_expiration, theme }) {
    await this.query(
      `UPDATE user_settings 
       SET default_domain = COALESCE(?, default_domain),
           notify_on_click = COALESCE(?, notify_on_click),
           notify_on_expiration = COALESCE(?, notify_on_expiration),
           theme = COALESCE(?, theme)
       WHERE user_id = ?`,
      [default_domain, notify_on_click, notify_on_expiration, theme, userId]
    );
    return this.findById(userId);
  }
}

module.exports = new UserRepository();