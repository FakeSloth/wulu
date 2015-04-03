'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

var _fs = require('fs');

var fs = _interopRequire(_fs);

module.exports = reload;

function reload() {
  var commands = {
    reload: function reload(target) {
      if (!this.can('reload')) {
        return;
      }this.sendReply('Reloading...');
      if (!target || target === 'commands') {
        try {
          var dir = fs.readdirSync('wulu/build/commands');
          dir.forEach((function (file) {
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