const BaseRepository = require("./BaseRepository");

class UrlRepository extends BaseRepository {
  async create(url) {
    const result = await this.query(
      `
      INSERT INTO urls
      (
        user_id,
        original_url,
        short_code,
        custom_alias,
        title,
        description,
        password_hash,
        expires_at,
        is_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        url.user_id,
        url.original_url,
        url.short_code,
        url.custom_alias,
        url.title,
        url.description,
        url.password_hash,
        url.expires_at,
        url.is_active
      ]
    );

    return result.insertId;
  }

  async findByShortCode(shortCode) {
    return this.findOne(
      `
      SELECT *
      FROM urls
      WHERE short_code = ?
      `,
      [shortCode]
    );
  }

  async findByUser(userId) {
    return this.query(
      `
      SELECT *
      FROM urls
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );
  }
}

module.exports = new UrlRepository();