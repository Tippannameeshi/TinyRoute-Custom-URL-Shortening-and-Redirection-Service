const ForbiddenError = require("../errors/ForbiddenError");

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError("User authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError("You do not have the required permissions to perform this action", "INSUFFICIENT_ROLE"));
    }

    next();
  };
}

module.exports = authorize;