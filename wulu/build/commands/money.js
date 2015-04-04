'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

var _is = require('is_js');

var is = _interopRequire(_is);

var _Economy = require('../economy');

var Economy = _interopRequire(_Economy);

module.exports = money;

var currency_name = Economy.currency_name;

/**
 * Handle money commands from Economy.
 */

function money() {
  var commands = {
    atm: 'wallet',
    purse: 'wallet',
    wallet: function wallet(target, room, user) {
      if (!this.canBroadcast()) {
        return;
      }var name = toId(target);
      if (!name) name = user.userid;
      Economy.get(name, (function (amount) {
        if (amount >= 2) currency_name += 's';
        this.sendReplyBox('' + (target || user.name) + ' has ' + amount + ' ' + currency_name + '.');
        room.update();
      }).bind(this));
    },

    generatemoney: 'givemoney',
    givemoney: function givemoney(target, room, user) {
      if (!user.can('givemoney')) {
        return;
      }if (!target || target.indexOf(',') < 0) {
        return this.parse('/help givemoney');
      }var parts = target.split(',');
      this.splitTarget(parts[0]);
      var amount = Number(parts[1].trim());
      var currency = currency_name;

      if (!this.targetUser) {
        return this.sendReply('User ' + this.targetUsername + ' not found.');
      }if (is.not.number(amount)) {
        return this.sendReply('Must be a number.');
      }if (is.decimal(amount)) {
        return this.sendReply('Cannot contain a decimal.');
      }if (amount < 1) {
        return this.sendReply('You can\'t give less than one ' + currency + '.');
      }if (amount >= 2) currency += 's';

      Economy.give(this.targetUsername.toLowerCase(), amount, (function (total) {
        var cash = total >= 2 ? currency_name + 's' : currency_name;
        this.sendReply('' + this.targetUsername + ' was given ' + amount + ' ' + currency + '. This user now has ' + total + ' ' + cash + '.');
        Users.get(this.targetUsername).send('' + user.name + ' has given you ' + amount + ' ' + currency + '. You now have ' + total + ' ' + cash + '.');
      }).bind(this));
    },

    takemoney: function takemoney(target, room, user) {
      if (!user.can('takemoney')) {
        return;
      }if (!target || target.indexOf(',') < 0) {
        return;
      }var parts = target.split(',');
      this.splitTarget(parts[0]);
      var amount = Number(parts[1].trim());
      var currency = currency_name;

      if (!this.targetUser) {
        return this.sendReply('User ' + this.targetUsername + ' not found.');
      }if (is.not.number(amount)) {
        return this.sendReply('Must be a number.');
      }if (is.decimal(amount)) {
        return this.sendReply('Cannot contain a decimal.');
      }if (amount < 1) {
        return this.sendReply('You can\'t give less than one ' + currency + '.');
      }if (amount >= 2) currency += 's';

      Economy.take(this.targetUsername.toLowerCase(), amount, (function (total) {
        var cash = total >= 2 ? currency_name + 's' : currency_name;
        this.sendReply('' + this.targetUsername + ' was losted ' + amount + ' ' + currency + '. This user now has ' + total + ' ' + cash + '.');
        Users.get(this.targetUsername).send('' + user.name + ' has taken ' + amount + ' ' + currency + ' from you. You now have ' + total + ' ' + cash + '.');
      }).bind(this));
    },

    transfer: 'transfermoney',
    transfermoney: function transfermoney(target, room, user) {
      if (!target || target.indexOf(',') < 0) {
        return this.sendReply('/transfer [user], [amount] - Transfer a certain amount of money to a user.');
      }var parts = target.split(',');
      this.splitTarget(parts[0]);
      var amount = Number(parts[1].trim());
      var currency = currency_name;
      var targetName = this.targetUsername;

      if (!this.targetUser) {
        return this.sendReply('User ' + targetName + ' not found.');
      }if (is.not.number(amount)) {
        return this.sendReply('Must be a number.');
      }if (is.decimal(amount)) {
        return this.sendReply('Cannot contain a decimal.');
      }if (amount < 1) {
        return this.sendReply('You can\'t give less than one ' + currency + '.');
      }if (amount >= 2) currency += 's';

      var self = this;
      Economy.get(user.name.toLowerCase(), function (userAmount) {
        if (amount > userAmount) return self.sendReply('You cannot transfer more money than what you have.');
        Economy.give(targetName.toLowerCase(), amount, function (targetTotal) {
          Economy.take(user.name.toLowerCase(), amount, function (userTotal) {
            if (!userTotal) return self.sendReply('Cannot take anymore money from this user.');
            var targetCash = targetTotal >= 2 ? currency_name + 's' : currency_name;
            var userCash = userTotal >= 2 ? currency_name + 's' : currency_name;
            self.sendReply('You have successfully transferred ' + amount + ' ' + currency + ' to ' + targetName + '. You now have ' + userTotal + ' ' + userCash + '.');
            self.sendReply('' + user.name + ' has transferred ' + amount + ' ' + currency + ' to you. You now have ' + targetTotal + ' ' + targetCash + '.');
          });
        });
      });
    }
  };

  Object.merge(CommandParser.commands, commands);
}