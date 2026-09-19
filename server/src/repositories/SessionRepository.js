const BaseRepository = require("./BaseRepository");

class SessionRepository extends BaseRepository {
  async create(session) {
    const result = await this.query(
      `
      INSERT INTO sessions
      (
        user_id,
        refresh_token_hash,
        device_name,
        browser,
        operating_system,
        ip_address,
        expires_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        session.user_id,
        session.refresh_token_hash,
        session.device_name,
        session.browser,
        session.operating_system,
        session.ip_address,
        session.expires_at
      ]
    );

    return result.insertId;
  }

  async findActiveSessions(userId) {
    return this.query(
      `
      SELECT *
      FROM sessions
      WHERE user_id = ?
      AND revoked_at IS NULL
      `,
      [userId]
    );
  }
}

module.exports = new SessionRepository();