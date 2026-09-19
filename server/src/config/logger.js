const path = require("path");
const winston = require("winston");

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logsDir = path.join(__dirname, "../../logs");

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error"
    }),
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log")
    })
  ]
});

// Audit logger for security & tracking events
const auditLogger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, "audit.log")
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
}

module.exports = {
  logger,
  auditLogger
};