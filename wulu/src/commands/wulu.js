import jf from 'jsonfile';
import util from 'util';

export default wulu;

let version = jf.readFileSync(__dirname + '/../../../package.json').version;

/**
 * wulu specific commands.
 */

function wulu() {
  var commands = {
    wulu() {
      this.sendReplyBox(`This server is using <a href="https://github.com/FakeSloth/wulu">wulu</a> ${version}`);
    },

    fakesloth() {
      this.sendReplyBox(`Server sponsored by <a href="https://github.com/FakeSloth">FakeSloth</a>.`);
    }
  };

  Object.merge(CommandParser.commands, commands);
}
