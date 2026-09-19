const crypto = require("crypto");

const bcrypt = require("bcrypt");

async function hashRefreshToken(token) {
  return bcrypt.hash(token, 10);
}

async function compareRefreshToken(
  token,
  hash
) {
  return bcrypt.compare(token, hash);
}

function randomToken() {
  return crypto
    .randomBytes(64)
    .toString("hex");
}

module.exports = {
  hashRefreshToken,
  compareRefreshToken,
  randomToken
};