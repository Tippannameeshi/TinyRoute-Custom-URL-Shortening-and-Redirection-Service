const BaseRepository = require("./BaseRepository");

class ClickRepository extends BaseRepository {
  async create(click) {
    const result = await this.query(
      `
      INSERT INTO clicks
      (
        url_id,
        ip_address,
        browser,
        operating_system,
        device,
        country,
        city,
        referrer
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        click.url_id,
        click.ip_address,
        click.browser,
        click.operating_system,
        click.device,
        click.country,
        click.city,
        click.referrer
      ]
    );

    return result.insertId;
  }

  async findByUrl(urlId) {
    return this.query(
      `
      SELECT *
      FROM clicks
      WHERE url_id = ?
      ORDER BY clicked_at DESC
      `,
      [urlId]
    );
  }
}

module.exports = new ClickRepository();