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
    seen: function seen(target, room, user) {
      if (!this.canBroadcast()) {
        return;
      }if (!target) {
        return this.sendReply('/seen [username] - Shows when the user last connected on the server.');
      }this.splitTarget(target);
      if (this.targetUser) {
        return this.sendReplyBox('' + this.targetUsername + ' is <b>currently online</b>.');
      }var self = this;
      _User2['default'].findOne({ name: toId(target) }, function (err, user) {
        if (err) return;
        if (!user || !user.seen) {
          self.sendReplyBox('' + self.targetUsername + ' has never been online on this server.');
          return room.update();
        }
        self.sendReplyBox('' + self.targetUsername + ' was last seen <b>' + _moment2['default'](user.seen).fromNow() + '</b>.');
        room.update();
      });
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];