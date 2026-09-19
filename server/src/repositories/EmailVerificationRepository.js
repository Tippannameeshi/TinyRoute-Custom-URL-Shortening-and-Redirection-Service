const BaseRepository = require("./BaseRepository");

class EmailVerificationRepository extends BaseRepository {
  async create({ user_id, token_hash, expires_at }) {
    const result = await this.query(
      `INSERT INTO email_verifications (user_id, token_hash, expires_at)
       VALUES (?, ?, ?)`,
      [user_id, token_hash, expires_at]
    );
    return result.insertId;
  }

  async findByTokenHash(token_hash) {
    return this.findOne(
      `SELECT * FROM email_verifications WHERE token_hash = ? AND verified_at IS NULL AND expires_at > NOW()`,
      [token_hash]
    );
  }

  async markAsVerified(id) {
    await this.query(
      `UPDATE email_verifications SET verified_at = NOW() WHERE id = ?`,
      [id]
    );
  }
}

module.exports = new EmailVerificationRepository();
