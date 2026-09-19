const { pool } = require("../database/connection");

class BaseRepository {
  async query(sql, params = []) {
    const [rows] = await pool.execute(sql, params);
    return rows;
  }

  async findOne(sql, params = []) {
    const [rows] = await pool.execute(sql, params);
    return rows.length ? rows[0] : null;
  }

  async transaction(callback) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const result = await callback(connection);

      await connection.commit();

      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = BaseRepository;