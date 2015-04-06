'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = clearall;

function clearall() {
  var commands = {
    clearall: function clearall(target, room) {
      if (!this.can('clearall')) {
        return false;
      }if (room.battle) {
        return this.sendReply('You cannot /clearall in battle rooms.');
      }var len = room.log.length;
      while (len--) {
        room.log[len] = '';
      }

      var users = [];
      for (var user in room.users) {
        users.push(user);
        Users.get(user).leaveRoom(room, Users.get(user).connections[0]);
      }

      len = users.length;
      setTimeout(function () {
        while (len--) {
          Users.get(users[len]).joinRoom(room, Users.get(users[len]).connections[0]);
        }
      }, 1000);
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];