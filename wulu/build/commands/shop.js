'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Economy = require('../economy');

var _Economy2 = _interopRequireWildcard(_Economy);

exports['default'] = shop;

var shop_data = [['Symbol', 'Buys a custom symbol to go infront of name and puts you at top of userlist. (Temporary until restart, certain symbols are blocked)', 5], ['Fix', 'Buys the ability to alter your current custom avatar or trainer card. (don\'t buy if you have neither)', 10], ['Poof', 'Buy a poof message to be added into the pool of possible poofs.', 15], ['Who', 'Buys a custom whois bot message for your name.', 25], ['Avatar', 'Buys an custom avatar to be applied to your name (You supply. Images larger than 80x80 may not show correctly)', 30], ['Trainer', 'Buys a trainer card which shows information through a command.', 50], ['Room', 'Buys a chatroom for you to own. (within reason, can be refused)', 100]];

var global_shop = getShopDisplay(shop_data);
var currency_name = _Economy2['default'].currency_name;

/**
 * Shop where user can buy stuff with money.
 *
 * @param {Array} shop
 */

function shop() {
  var shop = arguments[0] === undefined ? shop_data : arguments[0];

  var commands = {
    shop: function shop() {
      if (!this.canBroadcast()) {
        return;
      }return this.sendReply('|raw|' + global_shop);
    },

    buy: function buy(target, room, user) {
      if (!target) {
        return this.sendReply('/buy [command] - Buys an item from the shop.');
      }var self = this;
      _Economy2['default'].get(user.userid, function (money) {
        var len = shop.length,
            match = undefined;

        var _loop = function () {
          if (target.toLowerCase() !== shop[len][0].toLowerCase()) return 'continue';
          match = true;
          var price = shop[len][2];
          var item_currency = price - money >= 2 ? currency_name + 's' : currency_name;
          if (price > money) {
            return {
              v: self.sendReply('You don\'t have enough money for this. You need ' + (price - money) + ' ' + item_currency + ' more to buy ' + target + '.')
            };
          }
          _Economy2['default'].take(user.userid, price, function (money) {
            var currency = money >= 2 ? currency_name + 's' : currency_name;
            self.sendReply('You have bought ' + target + ' for ' + price + ' ' + item_currency + '. You now have ' + money + ' ' + currency + ' left.');
            if (target.toLowerCase() === 'symbol') {
              user.canCustomSymbol = true;
              self.sendReply('You have purchased a custom symbol. You can use /customsymbol to get your custom symbol.\n                              You will have this until you log off for more than an hour.\n                              If you do not want your custom symbol anymore, you may use /resetsymbol to go back to your old symbol.');
            }
          });
          room.add('' + user.name + ' has bought ' + target + ' from the shop.');
          room.update();
        };

        while (len--) {
          var _ret = _loop();

          switch (_ret) {
            case 'continue':
              continue;

            default:
              if (typeof _ret === 'object') return _ret.v;
          }
        }
        if (!match) {
          self.sendReply('' + target + ' not found in shop.');
        }
      });
    },

    customsymbol: function customsymbol(target, room, user) {
      if (!user.canCustomSymbol) {
        return this.sendReply('You need to buy this item from the shop.');
      }if (!target || target.length > 1) {
        return this.sendReply('/customsymbol [symbol] - Get a custom symbol.');
      }if (target.match(/[A-Za-z\d]+/g) || '?!+%@★&~#'.indexOf(target) >= 0) {
        return this.sendReply('Sorry, but you cannot change your symbol to this for safety/stability reasons.');
      }user.oldGetIdentity = user.getIdentity;
      user.getIdentity = function (roomid) {
        var name = this.oldGetIdentity(roomid);
        return target + name.slice(1);
      };
      user.updateIdentity();
      user.canCustomSymbol = false;
      user.hasCustomSymbol = true;
    },

    resetsymbol: function resetsymbol(target, room, user) {
      if (!user.hasCustomSymbol) {
        return this.sendReply('You don\'t have a custom symbol.');
      }user.getIdentity = function (roomid) {
        return this.oldGetIdentity(roomid);
      };
      user.updateIdentity();
      user.hasCustomSymbol = false;
      this.sendReply('Your symbol has been reset.');
    }
  };

  Object.merge(CommandParser.commands, commands);
}

/**
 * Displays the shop
 *
 * @param {Array} shop
 * @return {String} display
 */

function getShopDisplay(shop) {
  var display = '<table border="1" cellspacing="0" cellpadding="5" width="100%">\n            <tbody>\n              <tr>\n                <th>Command</th>\n                <th>Description</th>\n                <th>Cost</th>\n            </tr>'.replace(/(\r\n|\n|\r)/gm, '');

  var start = 0,
      section = undefined;
  while (start < shop.length) {
    section = shop[start];
    display += ('<tr>\n            <td><button name="send" value="/buy ' + section[0] + '">' + section[0] + '</button></td>\n            <td>' + section[1] + '</td>\n            <td>' + section[2] + '</td>\n          </tr>').replace(/(\r\n|\n|\r)/gm, '');
    start++;
  }
  display += '</tbody></table><center>To buy an item from the shop, use /buy <em>command</em>.</center>';
  return display;
}
module.exports = exports['default'];