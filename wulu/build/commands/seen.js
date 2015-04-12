'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _User = require('../user');

var _User2 = _interopRequireWildcard(_User);

var _moment = require('moment');

var _moment2 = _interopRequireWildcard(_moment);

exports['default'] = seen;

function seen() {
  var commands = {
    seen: function seen(target, room) {
      if (!this.canBroadcast()) {
        return;
      }if (!target) {
        return this.sendReply('/seen [username] - Shows when the user last connected on the server.');
      }var user = Users.get(target);
      if (user && user.connected) {
        return this.sendReplyBox('' + target + ' is <b>currently online</b>.');
      }var self = this;
      _User2['default'].findOne({ name: toId(target) }, function (err, user) {
        if (err) return;
        if (!user || !user.seen) {
          self.sendReplyBox('' + target + ' has never been online on this server.');
          return room.update();
        }
        self.sendReplyBox('' + target + ' was last seen <b>' + _moment2['default'](user.seen).fromNow() + '</b>.');
        room.update();
      });
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];