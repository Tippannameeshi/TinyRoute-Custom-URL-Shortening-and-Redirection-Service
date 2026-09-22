const mysql = require("mysql2/promise");
const env = require("../config/env");
const { logger } = require("../config/logger");

const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  waitForConnections: true,
  connectionLimit: env.db.connectionLimit || 10,
  queueLimit: 0,
  enableKeepAlive: true,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    logger.info(
      `MySQL Connected Successfully to ${env.db.database} at ${env.db.host}:${env.db.port}`,
    );
    connection.release();
  } catch (error) {
    logger.error(`MySQL Connection Failed: ${error.message}`);
    throw error;
  }
}

module.exports = {
  pool,
  testConnection,
};
