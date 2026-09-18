const winston = require("winston");
const fs = require("fs");
const path = require("path");

const logDirectory = path.join(__dirname, "..", "logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, {
    recursive: true
  });
}

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),

    winston.format.errors({
      stack: true
    }),

    winston.format.json()
  ),

  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, "combined.log")
    }),

    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error"
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      )
    })
  );
}

module.exports = logger;