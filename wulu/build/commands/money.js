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
      Economy.get(targetUser.name.toLowerCase(), (function (amount) {
        if (amount >= 2) currency += "s";
        this.sendReplyBox("" + targetUser.name + " has " + amount + " " + currency + ".");
        room.update();
      }).bind(this));
    },

    generatemoney: "givemoney",
    givemoney: function givemoney(target, room, user) {
      if (!user.can("givemoney")) {
        return;
      }if (!target || target.indexOf(",") < 0) {
        return this.parse("/help givemoney");
      }var parts = target.split(",");
      this.splitTarget(parts[0]);
      var amount = Number(parts[1].trim());
      var currency = currency_name;

      if (!this.targetUser) {
        return this.sendReply("User " + this.targetUsername + " not found.");
      }if (is.not.number(amount)) {
        return this.sendReply("Must be a number.");
      }if (is.decimal(amount)) {
        return this.sendReply("Cannot contain a decimal.");
      }if (amount < 1) {
        return this.sendReply("You can't give less than one " + currency + ".");
      }if (amount >= 2) currency += "s";

      Economy.give(this.targetUsername.toLowerCase(), amount, (function (total) {
        this.sendReply("" + this.targetUsername + " was given " + amount + " " + currency + ". This user now has " + total + " " + currency + ".");
        Users.get(this.targetUsername).send("" + user.name + " has given you " + amount + " " + currency + ". You now have " + total + " " + currency + ".");
      }).bind(this));
    },

    takemoney: function takemoney(target, room, user) {
      if (!user.can("takemoney")) {
        return;
      }if (!target || target.indexOf(",") < 0) {
        return this.parse("/help takemoney");
      }var parts = target.split(",");
      this.splitTarget(parts[0]);
      var amount = Number(parts[1].trim());
      var currency = currency_name;

      if (!this.targetUser) {
        return this.sendReply("User " + this.targetUsername + " not found.");
      }if (is.not.number(amount)) {
        return this.sendReply("Must be a number.");
      }if (is.decimal(amount)) {
        return this.sendReply("Cannot contain a decimal.");
      }if (amount < 1) {
        return this.sendReply("You can't give less than one " + currency + ".");
      }if (amount >= 2) currency += "s";

      Economy.take(this.targetUsername.toLowerCase(), amount, (function (total) {
        this.sendReply("" + this.targetUsername + " was losted " + amount + " " + currency + ". This user now has " + total + " " + currency + ".");
        Users.get(this.targetUsername).send("" + user.name + " has taken " + amount + " " + currency + " from you. You now have " + total + " " + currency + ".");
      }).bind(this));
    },

    transfer: "transfermoney",
    transfermoney: function transfermoney(target, room, user) {
      if (!target || target.indexOf(",") < 0) {
        return this.parse("/help takemoney");
      }var parts = target.split(",");
      this.splitTarget(parts[0]);
      var amount = Number(parts[1].trim());
      var currency = currency_name;
      var targetName = this.targetUsername;

      if (!this.targetUser) {
        return this.sendReply("User " + targetName + " not found.");
      }if (is.not.number(amount)) {
        return this.sendReply("Must be a number.");
      }if (is.decimal(amount)) {
        return this.sendReply("Cannot contain a decimal.");
      }if (amount < 1) {
        return this.sendReply("You can't give less than one " + currency + ".");
      }if (amount >= 2) currency += "s";

      var self = this;
      Economy.get(user.name.toLowerCase(), function (userAmount) {
        if (amount > userAmount) return self.sendReply("You cannot transfer more money than what you have.");
        Economy.give(targetName.toLowerCase(), amount, function (targetTotal) {
          Economy.take(user.name.toLowerCase(), amount, function (userTotal) {
            self.sendReply("You have successfully transferred " + amount + " " + currency + " to " + targetName + ". You now have " + userTotal + " " + currency + ".");
            self.sendReply("" + user.name + " has transferred " + amount + " " + currency + " to you. You now have " + targetTotal + " " + currency + ".");
          });
        });
      });
    }
  };

  Object.merge(CommandParser.commands, commands);
}