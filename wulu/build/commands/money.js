'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _is = require('is_js');

var _is2 = _interopRequireWildcard(_is);

var _Economy = require('../economy');

var _Economy2 = _interopRequireWildcard(_Economy);

exports['default'] = money;

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
      }_Economy2['default'].get(target || user.userid, (function (amount) {
        var currency = Wulu.Economy.currency_name;
        if (amount !== 1) currency += 's';
        this.sendReplyBox('' + (target || user.name) + ' has ' + amount + ' ' + currency + '.');
        room.update();
      }).bind(this));
    },

    generatemoney: 'givemoney',
    givemoney: function givemoney(target, room, user) {
      if (!user.can('givemoney')) {
        return false;
      }if (!target || target.indexOf(',') < 0) {
        return this.sendReply('/givemoney [user], [amount] - Give a user a certain amount of money.');
      }var parts = target.split(',');
      this.splitTarget(parts[0]);
      var amount = Number(parts[1].trim());
      var currency = Wulu.Economy.currency_name;
      var currency_name = Wulu.Economy.currency_name;

      if (!this.targetUser) {
        return this.sendReply('User ' + this.targetUsername + ' not found.');
      }if (_is2['default'].not.number(amount)) {
        return this.sendReply('Must be a number.');
      }if (_is2['default'].decimal(amount)) {
        return this.sendReply('Cannot contain a decimal.');
      }if (amount < 1) {
        return this.sendReply('You can\'t give less than one ' + currency + '.');
      }if (amount !== 1) currency += 's';

      _Economy2['default'].give(this.targetUsername, amount, (function (total) {
        var cash = total !== 1 ? currency_name + 's' : currency_name;
        this.sendReply('' + this.targetUsername + ' was given ' + amount + ' ' + currency + '. This user now has ' + total + ' ' + cash + '.');
        Users.get(this.targetUsername).send('' + user.name + ' has given you ' + amount + ' ' + currency + '. You now have ' + total + ' ' + cash + '.');
      }).bind(this));
    },

    takemoney: function takemoney(target, room, user) {
      if (!user.can('takemoney')) {
        return false;
      }if (!target || target.indexOf(',') < 0) {
        return this.sendReply('/takemoney [user], [amount] - Take a certain amount of money from a user.');
      }var parts = target.split(',');
      this.splitTarget(parts[0]);
      var amount = Number(parts[1].trim());
      var currency = Wulu.Economy.currency_name;
      var currency_name = Wulu.Economy.currency_name;

      if (!this.targetUser) {
        return this.sendReply('User ' + this.targetUsername + ' not found.');
      }if (_is2['default'].not.number(amount)) {
        return this.sendReply('Must be a number.');
      }if (_is2['default'].decimal(amount)) {
        return this.sendReply('Cannot contain a decimal.');
      }if (amount < 1) {
        return this.sendReply('You can\'t give less than one ' + currency + '.');
      }if (amount !== 1) currency += 's';

      _Economy2['default'].take(this.targetUsername, amount, (function (total) {
        var cash = total !== 1 ? currency_name + 's' : currency_name;
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
      var currency = Wulu.Economy.currency_name;
      var targetName = this.targetUsername;
      var currency_name = Wulu.Economy.currency_name;

      if (!this.targetUser) {
        return this.sendReply('User ' + targetName + ' not found.');
      }if (_is2['default'].not.number(amount)) {
        return this.sendReply('Must be a number.');
      }if (_is2['default'].decimal(amount)) {
        return this.sendReply('Cannot contain a decimal.');
      }if (amount < 1) {
        return this.sendReply('You can\'t give less than one ' + currency + '.');
      }if (amount !== 1) currency += 's';

      var self = this;
      _Economy2['default'].get(user.userid, function (userAmount) {
        if (amount > userAmount) return self.sendReply('You cannot transfer more money than what you have.');
        _Economy2['default'].give(targetName, amount, function (targetTotal) {
          _Economy2['default'].take(user.userid, amount, function (userTotal) {
            var targetCash = targetTotal !== 1 ? currency_name + 's' : currency_name;
            var userCash = userTotal !== 1 ? currency_name + 's' : currency_name;
            self.sendReply('You have successfully transferred ' + amount + ' ' + currency + ' to ' + targetName + '. You now have ' + userTotal + ' ' + userCash + '.');
            self.sendReply('' + user.name + ' has transferred ' + amount + ' ' + currency + ' to you. You now have ' + targetTotal + ' ' + targetCash + '.');
          });
        });
      });
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];