const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const nodeEnv = process.env.NODE_ENV || "development";
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

if (nodeEnv === "production" && (!accessSecret || !refreshSecret)) {
  throw new Error(
    "JWT_ACCESS_SECRET and JWT_REFRESH_SECRET are required in production.",
  );
}

if (
  nodeEnv === "production" &&
  (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME)
) {
  throw new Error("DB_HOST, DB_USER, and DB_NAME are required in production.");
}

module.exports = {
  nodeEnv,
  port: Number(process.env.PORT) || 5000,
  app: {
    baseUrl: process.env.BASE_URL || "http://localhost:5000",
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "url_shortener",
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  },
  jwt: {
    accessSecret: accessSecret || "development_access_secret_change_me",
    refreshSecret: refreshSecret || "development_refresh_secret_change_me",
    accessExpiration: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiration: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
};
