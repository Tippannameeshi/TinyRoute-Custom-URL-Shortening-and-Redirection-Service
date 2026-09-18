const logger = require("../config/logger");

const requestLogger = (req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();

    const responseTime =
      Number(end - start) / 1000000;

    logger.info({
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${responseTime.toFixed(2)} ms`,
      ip: req.ip,
      userAgent: req.get("User-Agent")
    });
  });

  next();
};

module.exports = requestLogger;