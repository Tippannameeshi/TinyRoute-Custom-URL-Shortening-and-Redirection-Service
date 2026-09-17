import app from "./app.js";

import { env } from "./config/env.js";

import logger from "./config/logger.js";

import { connectDatabase } from "./config/database.js";

const startServer = async () => {

    await connectDatabase();

    const server = app.listen(env.PORT, () => {

        logger.info(`Server running on port ${env.PORT}`);

    });

    const shutdown = () => {

        logger.info("Shutting down server...");

        server.close(() => {

            logger.info("Server stopped");

            process.exit(0);

        });

    };

    process.on("SIGINT", shutdown);

    process.on("SIGTERM", shutdown);

};

startServer();