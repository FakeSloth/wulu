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

var currency_name = _Economy2['default'].currency_name;

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
      _Economy2['default'].get(name, (function (amount) {
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
      }if (_is2['default'].not.number(amount)) {
        return this.sendReply('Must be a number.');
      }if (_is2['default'].decimal(amount)) {
        return this.sendReply('Cannot contain a decimal.');
      }if (amount < 1) {
        return this.sendReply('You can\'t give less than one ' + currency + '.');
      }if (amount >= 2) currency += 's';

      _Economy2['default'].give(this.targetUsername.toLowerCase(), amount, (function (total) {
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
      }if (_is2['default'].not.number(amount)) {
        return this.sendReply('Must be a number.');
      }if (_is2['default'].decimal(amount)) {
        return this.sendReply('Cannot contain a decimal.');
      }if (amount < 1) {
        return this.sendReply('You can\'t give less than one ' + currency + '.');
      }if (amount >= 2) currency += 's';

      _Economy2['default'].take(this.targetUsername.toLowerCase(), amount, (function (total) {
        var cash = total >= 2 ? currency_name + 's' : currency_name;
        this.sendReply('' + this.targetUsername + ' was losted ' + amount + ' ' + currency + '. This user now has ' + total + ' ' + cash + '.');
        Users.get(this.targetUsername).send('' + user.name + ' has taken ' + amount + ' ' + currency + ' from you. You now have ' + total + ' ' + cash + '.');
      }).bind(this));
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];