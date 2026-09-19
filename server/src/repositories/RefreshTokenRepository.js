const BaseRepository = require("./BaseRepository");

class RefreshTokenRepository extends BaseRepository {
  async create({ user_id, token_hash, family_id, device_info, ip_address, expires_at }) {
    const result = await this.query(
      `INSERT INTO refresh_tokens (user_id, token_hash, family_id, device_info, ip_address, expires_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, token_hash, family_id, device_info, ip_address, expires_at]
    );
    return result.insertId;
  }

  async findByTokenHash(token_hash) {
    return this.findOne(
      `SELECT * FROM refresh_tokens WHERE token_hash = ?`,
      [token_hash]
    );
  }

  async findByFamilyId(family_id) {
    return this.query(
      `SELECT * FROM refresh_tokens WHERE family_id = ?`,
      [family_id]
    );
  }

  async revokeToken(id) {
    await this.query(
      `UPDATE refresh_tokens SET is_revoked = TRUE WHERE id = ?`,
      [id]
    );
  }

  async revokeFamily(family_id) {
    await this.query(
      `UPDATE refresh_tokens SET is_revoked = TRUE WHERE family_id = ?`,
      [family_id]
    );
  }

  async revokeUserTokens(user_id) {
    await this.query(
      `UPDATE refresh_tokens SET is_revoked = TRUE WHERE user_id = ?`,
      [user_id]
    );
  }
}

module.exports = new RefreshTokenRepository();
