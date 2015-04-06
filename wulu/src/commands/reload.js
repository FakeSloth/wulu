import fs from 'fs';

export default reload;

/**
 * Updates certain parts of the server without restarting.
 */

function reload() {
  let commands = {
    reload(target) {
      if (!this.can('reload')) return;

      if (!target || target === 'commands') {
        try {
          let dir = fs.readdirSync('wulu/build/commands');
          dir.forEach(function(file) {
            if (file === 'index.js') return;
            this.sendReply(file);
            this.parse(`/eval delete require.cache[require.resolve('./wulu/build/commands/${file}')]`);
            this.parse(`/eval require('./wulu/build/commands/${file}')()`);
          }.bind(this));
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
