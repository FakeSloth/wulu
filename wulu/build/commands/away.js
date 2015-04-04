'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = away;

/**
 * Sets user away or back.
 *
 * @param {String} message
 */

function away() {
  var message = arguments[0] === undefined ? 'Аԝау' : arguments[0];

  if (!Users.User.prototype.getOriginalIdentity) {
    Users.User.prototype.getOriginalIdentity = Users.User.prototype.getIdentity;
  }

  Users.User.prototype.getIdentity = function (roomid) {
    var name = this.getOriginalIdentity(roomid);
    if (this.isAway) {
      name += ' - ' + message;
    }
    return name;
  };

  var back = 'away',
      idle = 'away';

  var commands = {
    back: back,
    idle: idle,
    away: function away(target, room, user) {
      user.isAway = !user.isAway;
      user.updateIdentity();
      this.sendReply('You are ' + (user.isAway ? 'now' : 'no longer') + ' away.');
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];