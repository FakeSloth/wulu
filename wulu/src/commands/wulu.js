import jf from 'jsonfile';
import path from 'path';
import util from 'util';

export default wulu;

let version = jf.readFileSync(path.join(__dirname, '../../../package.json')).version;

/**
 * wulu specific commands.
 */

function wulu() {
  var commands = {
    wulu() {
      if (!this.canBroadcast()) return;
      this.sendReplyBox(`This server is using <a href="https://github.com/FakeSloth/wulu">wulu</a> ${version}`);
    },

    fakesloth() {
      if (!this.canBroadcast()) return;
      this.sendReplyBox(`This server sponsored by <a href="https://github.com/FakeSloth">FakeSloth</a>.`);
    }
  };

  Object.merge(CommandParser.commands, commands);
}
