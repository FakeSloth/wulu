"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var is = _interopRequire(require("is_js"));

var Economy = _interopRequire(require("../economy"));

module.exports = money;

/**
 * Handle money commands from Economy.
 *
 * @param {String} currency
 */
function money() {
  var currency = arguments[0] === undefined ? "buck" : arguments[0];

  var commands = {
    atm: "wallet",
    purse: "wallet",
    wallet: function wallet(target, room, user) {
      if (!this.canBroadcast()) {
        return;
      }var targetUser = this.targetUserOrSelf(target);
      Economy.get(targetUser.userid, (function (money) {
        if (money >= 2) currency += "s";
        this.sendReplyBox("" + targetUser.name + " has " + money + " " + currency + ".");
        room.update();
      }).bind(this));
    }
  };

  Object.merge(CommandParser.commands, commands);
}