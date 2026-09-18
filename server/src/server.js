const app = require("./app");

const env = require("./config/env");
const logger = require("./config/logger");

const { pool, testConnection } = require("./database/connection");

let server;

async function startServer() {
  try {
    await testConnection();

    server = app.listen(env.port, () => {
      logger.info(`Server started on http://localhost:${env.port}`);
      logger.info(`Environment: ${env.nodeEnv}`);
    });
  } catch (error) {
    logger.error(`Startup failed: ${error.message}`);
    process.exit(1);
  }
}

async function gracefulShutdown(signal) {
  logger.info(`${signal} received. Shutting down...`);

  if (server) {
    server.close(async () => {
      try {
        await pool.end();

        logger.info("MySQL connection pool closed.");

        logger.info("Server shutdown completed.");

        process.exit(0);
      } catch (error) {
        logger.error(error);

        process.exit(1);
      }
    });
  }
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception");
  logger.error(error);

  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Promise Rejection");
  logger.error(reason);

  process.exit(1);
});

startServer();