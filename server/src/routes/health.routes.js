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

  return ApiResponse.success(res, HTTP_STATUS.OK, "TinyRoute Health Check", {
    status: "UP",
    timestamp: new Date(),
    database: dbStatus,
    environment: process.env.NODE_ENV || "development"
  });
});

module.exports = router;