const express = require("express");
const ApiResponse = require("../utils/ApiResponse");
const HTTP_STATUS = require("../constants/httpStatusCodes");
const { pool } = require("../database/connection");

const router = express.Router();

router.get("/", async (req, res) => {
  let dbStatus = "healthy";
  try {
    await pool.query("SELECT 1");
  } catch (err) {
    dbStatus = "unhealthy";
  }

  const statusCode =
    dbStatus === "healthy" ? HTTP_STATUS.OK : HTTP_STATUS.SERVICE_UNAVAILABLE;
  return res.status(statusCode).json({
    success: dbStatus === "healthy",
    message: "TinyRoute Health Check",
    data: {
      status: dbStatus === "healthy" ? "UP" : "DEGRADED",
      timestamp: new Date(),
      database: dbStatus,
      environment: process.env.NODE_ENV || "development",
    },
  });
});

module.exports = router;
