import is from 'is_js';
import Economy from '../economy';

export default money;

/**
 * Handle money commands from Economy.
 *
 * @param {String} currency
 */
function money(currency='buck') {
  let commands = {
    atm: 'wallet',
    purse: 'wallet',
    wallet(target, room, user) {
      if (!this.canBroadcast()) return;
      let targetUser = this.targetUserOrSelf(target);
      Economy.get(targetUser.userid, function(money) {
        if (money >= 2) currency += 's';
        this.sendReplyBox(`${targetUser.name} has ${money} ${currency}.`);
        room.update();
      }.bind(this));
    }
  };

  Object.merge(CommandParser.commands, commands);
}
