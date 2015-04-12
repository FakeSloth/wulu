'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = hide;

function hide() {
  var commands = {
    show: function show(target, room, user) {
      if (!this.can('lock')) {
        return false;
      }user.hiding = false;
      user.updateIdentity();
      this.sendReply('You have revealed your staff symbol.');
    },

    hide: function hide(target, room, user) {
      if (!this.can('lock')) {
        return false;
      }user.hiding = true;
      user.updateIdentity();
      this.sendReply('You have hidden your staff symbol.');
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];