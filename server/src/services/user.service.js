const UserRepository = require("../repositories/UserRepository");
const NotFoundError = require("../errors/NotFoundError");

class UserService {
  async getSettings(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found.");

    return {
      default_domain: user.default_domain,
      notify_on_click: user.notify_on_click,
      notify_on_expiration: user.notify_on_expiration,
      theme: user.theme
    };
  }

  async updateSettings(userId, settingsData) {
    return UserRepository.updateSettings(userId, settingsData);
  }
}

module.exports = new UserService();
