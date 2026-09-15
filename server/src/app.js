import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";

import logger from "./config/logger.js";

import { env } from "./config/env.js";

import healthRoutes from "./routes/health.routes.js";

import errorHandler from "./middleware/errorHandler.js";

import notFound from "./middleware/notFound.js";

const app = express();

app.use(helmet());

app.use(cors({

    origin: env.CLIENT_URL,

    credentials: true

}));

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(

    pinoHttp({

        logger

    })

);

const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 200

});

app.use(limiter);

app.use("/health", healthRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;