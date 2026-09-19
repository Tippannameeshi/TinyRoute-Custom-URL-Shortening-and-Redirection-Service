const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const generateAuthTokens = (user, familyId = null) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ ...payload, familyId });

  return { accessToken, refreshToken };
};

module.exports = { generateAuthTokens };