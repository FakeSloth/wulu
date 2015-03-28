"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var is = _interopRequire(require("is_js"));

var Economy = _interopRequire(require("../economy"));

module.exports = money;

/**
 * Handle money commands from Economy.
 *
 * @param {String} currency_name
 */

function money() {
  var currency_name = arguments[0] === undefined ? "buck" : arguments[0];

  var commands = {
    atm: "wallet",
    purse: "wallet",
    wallet: function wallet(target, room, user) {
      if (!this.canBroadcast()) {
        return;
      }var targetUser = this.targetUserOrSelf(target);
      var currency = currency_name;
      Economy.get(targetUser.userid, (function (amount) {
        if (amount >= 2) currency += "s";
        this.sendReplyBox("" + targetUser.name + " has " + amount + " " + currency + ".");
        room.update();
      }).bind(this));
    },

    givemoney: function givemoney(target, room, user) {
      if (!user.can("givemoney")) {
        return;
      }if (!target || target.indexOf(",") < 0) {
        return this.parse("/help givemoney");
      }var parts = target.split(",");
      this.splitTarget(parts[0]);
      var amount = Number(parts[1].trim());
      var currency_name = currency;

      if (!this.targetUser) {
        return this.sendReply("User " + this.targetUsername + " not found.");
      }if (is.not.number(amount)) {
        return this.sendReply("Must be a number.");
      }if (is.decimal(amount)) {
        return this.sendReply("Cannot contain a decimal.");
      }if (amount < 1) {
        return this.sendReply("You can't give less than one " + currency + ".");
      }if (amount >= 2) currency += "s";

      Economy.give(money).to(this.targetUser.userid);

      this.sendReply("" + this.targetUsername + " was given " + money + " " + currency + ". This user now has " + money + " " + currency + ".");
      this.targetUser.send("" + user.name + " has given you " + money + " " + currency + ". You now have " + total + " " + currency + ".");
    }
  };

  Object.merge(CommandParser.commands, commands);
}