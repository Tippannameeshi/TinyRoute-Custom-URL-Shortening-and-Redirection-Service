const jwt = require("../utils/jwt");
const UnauthorizedError = require("../errors/UnauthorizedError");

function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("Authorization header is missing");
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new UnauthorizedError("Invalid authorization header");
    }

    const payload = jwt.verifyAccessToken(token);

    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authenticate;