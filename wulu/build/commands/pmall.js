'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = pmall;

/**
 * Private messages all users on the server.
 *
 * @param {String} name
 */

function pmall() {
  var name = arguments[0] === undefined ? '~Server PM [Do not reply]' : arguments[0];

  var commands = {
    masspm: 'pmall',
    pmall: function pmall(target, room, user) {
      if (!this.can('pmall')) {
        return false;
      }if (!target) {
        return this.sendReply('/pmall [message]');
      }for (var i in Users.users) {
        var message = '|pm|' + name + '|' + Users.users[i].getIdentity() + '|' + target;
        Users.users[i].send(message);
      }
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];