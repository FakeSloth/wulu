'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireWildcard(_fs);

exports['default'] = reload;

/**
 * Updates certain parts of the server without restarting.
 */

function reload() {
  var commands = {
    reload: function reload(target) {
      if (!this.can('reload')) {
        return;
      }if (!target || target === 'commands') {
        try {
          var dir = _fs2['default'].readdirSync('wulu/build/commands');
          dir.forEach((function (file) {
            if (file === 'index.js') return;
            this.sendReply(file);
            this.parse('/eval delete require.cache[require.resolve(\'./wulu/build/commands/' + file + '\')]');
            this.parse('/eval require(\'./wulu/build/commands/' + file + '\')()');
          }).bind(this));
          this.sendReply('|raw|<font color="green">All commands have been reloaded.</font>');
        } catch (e) {
          this.sendReply('|raw|<font color="red">Something failed while trying to reload files:</font> \n' + e.stack);
        }
      } else {
        this.sendReply('/reload [OPTIONAL - component | default: commands] - Update certain parts of the server with restarting.');
      }
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];