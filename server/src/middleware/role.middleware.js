const ForbiddenError = require("../errors/ForbiddenError");

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new ForbiddenError("Authentication required")
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ForbiddenError(
          "You do not have permission to access this resource"
        )
      );
    }

    next();
  };
}

module.exports = authorize;