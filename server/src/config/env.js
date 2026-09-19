const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  app: {
    baseUrl: process.env.BASE_URL || "http://localhost:5000",
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173"
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "url_shortener",
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "default_access_secret_tinyroute_2026_super_secure",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "default_refresh_secret_tinyroute_2026_super_secure",
    accessExpiration: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiration: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
  }
};