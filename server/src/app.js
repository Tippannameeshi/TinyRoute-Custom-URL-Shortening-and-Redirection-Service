import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";

import { env } from "./config/env.js";
import logger from "./config/logger.js";

import routes from "./routes/index.js";

import limiter from "./middleware/rateLimiter.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(
    pinoHttp({
        logger
    })
);

app.use(helmet());

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true
    })
);

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(limiter);

app.use("/api/v1", routes);

app.use(notFound);

app.use(errorHandler);

export default app;