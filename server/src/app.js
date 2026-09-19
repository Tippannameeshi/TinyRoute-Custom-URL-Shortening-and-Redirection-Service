const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const RedirectController = require("./controllers/redirect.controller");
const requestId = require("./utils/requestId");
const requestLogger = require("./middleware/requestLogger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter, redirectLimiter } = require("./middleware/rateLimiter");
const env = require("./config/env");

const app = express();

app.disable("x-powered-by");

// Security Headers
app.use(helmet({
  contentSecurityPolicy: false // Allow inline SVG / icons in client
}));

// CORS Configuration
app.use(
  cors({
    origin: env.app.clientUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-request-id"]
  })
);

app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// Request Correlation ID and Winston Request Logging
app.use(requestId);
app.use(requestLogger);

// Global Rate Limiting for API routes
app.use("/api", apiLimiter, routes);

// Top-level Short Code Browser Redirection: GET /:shortCode
app.get("/:shortCode", redirectLimiter, RedirectController.handleWebRedirect);

// 404 Handler
app.use(notFound);

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;