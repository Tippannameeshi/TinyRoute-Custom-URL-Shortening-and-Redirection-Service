const ForbiddenError = require("../errors/ForbiddenError");
const UserRepository = require("../repositories/UserRepository");

function authorize(...roles) {
  return async (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError("User authentication required"));
    }

    const user = await UserRepository.findById(req.user.id);
    if (!user || !user.is_active || !roles.includes(user.role)) {
      return next(
        new ForbiddenError(
          "You do not have the required permissions to perform this action",
          "INSUFFICIENT_ROLE",
        ),
      );
    }

    next();
  };
}

module.exports = authorize;
