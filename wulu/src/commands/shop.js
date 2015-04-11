import Economy from '../economy';
import User from '../user';

export default shop;

let shop_data = [
  ['Symbol', 'Buys a custom symbol to go infront of name and puts you at top of userlist. (Temporary until restart, certain symbols are blocked)', 5],
  ['Fix', 'Buys the ability to alter your current custom avatar or trainer card. (don\'t buy if you have neither)', 10],
  ['Poof', 'Buy a poof message to be added into the pool of possible poofs.', 15],
  ['Avatar', 'Buys an custom avatar to be applied to your name (You supply. Images larger than 80x80 may not show correctly)', 30],
  ['Trainer', 'Buys a trainer card which shows information through a command.', 50],
  ['PermaSymbol', 'Buys a permanent custom symbol.', 80],
  ['Room', 'Buys a chatroom for you to own. (within reason, can be refused)', 100]
];

let global_shop = getShopDisplay(shop_data);

/**
 * Shop where user can buy stuff with money.
 *
 * @param {Array} shop
 */

function shop(shop=shop_data) {
  /**
   * Enabling permanent custom symbols
   */

  if (!Users.User.prototype.originalJoinRoom) {
    Users.User.prototype.originalJoinRoom = Users.User.prototype.joinRoom;
  }

  Users.User.prototype.getIdentity = function(roomid) {
    if (this.locked) {
      return '‽' + this.name;
    }
    if (roomid) {
      if (this.mutedRooms[roomid]) {
        return '!' + this.name;
      }
      var room = Rooms.rooms[roomid];
      if (room && room.auth) {
        if (room.auth[this.userid]) {
          return room.auth[this.userid] + this.name;
        }
        if (room.isPrivate === true) return ' ' + this.name;
      }
    }
    if (this.customSymbol) {
      return this.customSymbol + this.name;
    }
    return this.group + this.name;
  };

  Users.User.prototype.joinRoom = function(room, connection) {
    if (room !== 'global') return this.originalJoinRoom(room, connection);
    let self = this;
    // Add delay because when user first join, they don't have there username yet.
    setTimeout(function() {
      User.findOne({name: self.userid}, function(err, userModel) {
        if (err) return;
        if (userModel && userModel.symbol) {
          self.customSymbol = userModel.symbol;
          self.updateIdentity();
          self.hasPermaCustomSymbol = true;
        }
      });
    }, 1000 * 10);
    return this.originalJoinRoom(room, connection);
  };

  let commands = {
    shop() {
      if (!this.canBroadcast()) return;
      return this.sendReply(`|raw|${global_shop}`);
    },

    buy(target, room, user) {
      if (!target) return this.sendReply('/buy [command] - Buys an item from the shop.');
      let self = this;
      Economy.get(user.name.toLowerCase(), function(money) {
        let len = shop.length, match;
        while(len--) {
          if (target.toLowerCase() !== shop[len][0].toLowerCase()) continue;
          match = true;
          let price = shop[len][2];
          let currency_name = Wulu.Economy.currency_name;
          let item_currency = (price - money) !== 1 ? currency_name + 's' : currency_name;
          if (price > money) {
            return self.sendReply(`You don't have enough money for this. You need ${price - money} ${item_currency} more to buy ${target}.`);
          }
          Economy.take(user.userid, price, function(money) {
            let currency = money !== 1 ? currency_name + 's' : currency_name;
            self.sendReply(`You have bought ${target} for ${price} ${item_currency}. You now have ${money} ${currency} left.`);
            if (target.toLowerCase() === 'symbol') {
              user.canCustomSymbol = true;
              self.sendReply(`You have purchased a custom symbol. You can use /customsymbol to get your custom symbol.
                              You will have this until you log off for more than an hour.
                              If you do not want your custom symbol anymore, you may use /resetsymbol to go back to your old symbol.`);
            } else if (target.toLowerCase() === 'permasymbol') {
              user.canPermaCustomSymbol = true;
              self.sendReply('You have purchased a permanent custom symbol. Use /permacustomsymbol to get your permanent custom symbol.');
            } else {
              for (let i in Users.users) {
                if (Users.users[i].group === '~') {
                  Users.users[i].send(`|pm|~Shop Alert|${Users.users[i].getIdentity()}|${user.name} has bought ${target}.`);
                }
              }
            }
          });
          room.add(`${user.name} has bought ${target} from the shop.`);
          room.update();
        }
        if (!match) {
          self.sendReply(`${target} not found in shop.`);
        }
      });
    },

    customsymbol(target, room, user) {
      if (!user.canCustomSymbol) return this.sendReply('You need to buy this item from the shop.');
      if (!target || target.length > 1) return this.sendReply('/customsymbol [symbol] - Get a custom symbol.');
      if (target.match(/[A-Za-z\d]+/g) || '?!+%@\u2605&~#'.indexOf(target) >= 0) return this.sendReply('Sorry, but you cannot change your symbol to this for safety/stability reasons.');
      user.customSymbol = target;
      user.updateIdentity();
      user.canCustomSymbol = false;
      user.hasCustomSymbol = true;
    },

    resetcustomsymbol: 'resetsymbol',
    resetsymbol(target, room, user) {
      if (!user.hasCustomSymbol && !user.hasPermaCustomSymbol) return this.sendReply('You don\'t have a custom symbol.');
      if (user.hasPermaCustomSymbol) {
        User.findOne({name: user.userid}, function(err, user) {
          if (err) return;
          user.symbol = '';
          user.save();
        });
        user.hasPermaCustomSymbol = false;
      }
      user.customSymbol = null;
      user.updateIdentity();
      user.hasCustomSymbol = false;
      this.sendReply('Your symbol has been reset.');
    },

    permacustomsymbol(target, room, user) {
      if (!user.canPermaCustomSymbol) return this.sendReply('You need to buy this item from the shop.');
      if (target.length > 1) return this.sendReply('/permacustomsymbol [symbol] - Get a custom symbol.');
      if (target.match(/[A-Za-z\d]+/g) || '?!+%@\u2605&~#'.indexOf(target) >= 0) return this.sendReply('Sorry, but you cannot change your symbol to this for safety/stability reasons.');
      User.findOne({name: user.userid}, function(err, userModel) {
        if (err) return;
        if (!userModel) return;
        userModel.symbol = target;
        userModel.save();
      });
      user.customSymbol = target;
      user.updateIdentity();
      user.hasPermaCustomSymbol = true;
      user.canPermaCustomSymbol = false;
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
  let display = `<table border="1" cellspacing="0" cellpadding="5" width="100%">
            <tbody>
              <tr>
                <th>Command</th>
                <th>Description</th>
                <th>Cost</th>
            </tr>`.replace(/(\r\n|\n|\r)/gm, '');

  let start = 0, section;
  while (start < shop.length) {
    section = shop[start];
    display += `<tr>
            <td><button name="send" value="/buy ${section[0]}">${section[0]}</button></td>
            <td>${section[1]}</td>
            <td>${section[2]}</td>
          </tr>`.replace(/(\r\n|\n|\r)/gm, '');
    start++;
  }
  display += '</tbody></table><center>To buy an item from the shop, use /buy <em>command</em>.</center>';
  return display;
}
