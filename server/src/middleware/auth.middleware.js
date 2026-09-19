const { verifyAccessToken } = require("../utils/jwt");
const UnauthorizedError = require("../errors/UnauthorizedError");

function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("Authorization header is missing", "MISSING_AUTH_HEADER");
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new UnauthorizedError("Invalid authorization format. Use 'Bearer <token>'", "INVALID_AUTH_FORMAT");
    }

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      throw new UnauthorizedError("Token has expired or is invalid", "INVALID_TOKEN");
    }

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

function optionalAuthenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();

  const [scheme, token] = authHeader.split(" ");
  if (scheme === "Bearer" && token) {
    try {
      const payload = verifyAccessToken(token);
      req.user = {
        id: payload.id,
        email: payload.email,
        role: payload.role
      };
    } catch (err) {
      // Ignore optional auth error
    }
  }
  next();
}

module.exports = {
  authenticate,
  optionalAuthenticate
};