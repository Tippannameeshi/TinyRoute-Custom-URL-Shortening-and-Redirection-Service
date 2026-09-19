const BaseRepository = require("./BaseRepository");

class PasswordResetRepository extends BaseRepository {
  async create({ user_id, token_hash, expires_at }) {
    const result = await this.query(
      `INSERT INTO password_resets (user_id, token_hash, expires_at)
       VALUES (?, ?, ?)`,
      [user_id, token_hash, expires_at]
    );
    return result.insertId;
  }

  async findByTokenHash(token_hash) {
    return this.findOne(
      `SELECT * FROM password_resets WHERE token_hash = ? AND used_at IS NULL AND expires_at > NOW()`,
      [token_hash]
    );
  }

  async markAsUsed(id) {
    await this.query(
      `UPDATE password_resets SET used_at = NOW() WHERE id = ?`,
      [id]
    );
  }
}

module.exports = new PasswordResetRepository();
