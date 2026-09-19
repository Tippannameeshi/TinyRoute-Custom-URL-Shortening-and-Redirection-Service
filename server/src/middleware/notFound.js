const NotFoundError = require("../errors/NotFoundError");

function notFound(req, res, next) {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`, "ROUTE_NOT_FOUND"));
}

module.exports = notFound;