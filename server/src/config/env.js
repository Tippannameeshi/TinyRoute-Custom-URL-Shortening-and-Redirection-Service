const dotenv = require("dotenv");

dotenv.config();

const requiredVariables = [
  "PORT",

  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",

  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",

  "JWT_ACCESS_EXPIRES_IN",
  "JWT_REFRESH_EXPIRES_IN"
];

const missing = requiredVariables.filter(
  (item) => !process.env[item]
);

if (missing.length) {
  console.error("\nMissing Environment Variables\n");

  missing.forEach((item) => {
    console.error(item);
  });

  process.exit(1);
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT),

  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,

    refreshSecret: process.env.JWT_REFRESH_SECRET,

    accessExpiresIn:
      process.env.JWT_ACCESS_EXPIRES_IN,

    refreshExpiresIn:
      process.env.JWT_REFRESH_EXPIRES_IN
  }
};