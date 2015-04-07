export default pmall;

/**
 * Private messages all users on the server.
 *
 * @param {String} name
 */

function pmall(name='~Server PM [Do not reply]') {
  let commands = {
    masspm: 'pmall',
    pmall(target) {
      if (!this.can('pmall')) return false;
      if (!target) return this.sendReply('/pmall [message]');

      for (let i in Users.users) {
        let message = `|pm|${name}|${Users.users[i].getIdentity()}|${target}`;
        Users.users[i].send(message);
      }
    }
  };

  Object.merge(CommandParser.commands, commands);
}
