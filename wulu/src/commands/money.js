import is from 'is_js';
import Economy from '../economy';

export default money;

let currency_name = Economy.currency_name;

/**
 * Handle money commands from Economy.
 */

function money() {
  let commands = {
    atm: 'wallet',
    purse: 'wallet',
    wallet(target, room, user) {
      if (!this.canBroadcast()) return;
      let name = toId(target);
      if (!name) name = user.userid;
      Economy.get(name, function(amount) {
        if (amount >= 2) currency_name += 's';
        this.sendReplyBox(`${target || user.name} has ${amount} ${currency_name}.`);
        room.update();
      }.bind(this));
    },

    'generatemoney': 'givemoney',
    givemoney(target, room, user) {
      if (!user.can('givemoney')) return;
      if (!target || target.indexOf(',') < 0) return this.sendReply('/givemoney [user], [amount] - Give a user a certain amount of money.');

      let parts = target.split(',');
      this.splitTarget(parts[0]);
      let amount = Number(parts[1].trim());
      let currency = currency_name;

      if (!this.targetUser) return this.sendReply(`User ${this.targetUsername} not found.`);
      if (is.not.number(amount)) return this.sendReply('Must be a number.');
      if (is.decimal(amount)) return this.sendReply('Cannot contain a decimal.');
      if (amount < 1) return this.sendReply(`You can't give less than one ${currency}.`);
      if (amount >= 2) currency += 's';

      Economy.give(this.targetUsername.toLowerCase(), amount, function(total) {
        let cash = total >= 2 ? currency_name + 's' : currency_name;
        this.sendReply(`${this.targetUsername} was given ${amount} ${currency}. This user now has ${total} ${cash}.`);
        Users.get(this.targetUsername).send(`${user.name} has given you ${amount} ${currency}. You now have ${total} ${cash}.`);
      }.bind(this));
    },

    takemoney(target, room, user) {
      if (!user.can('takemoney')) return;
      if (!target || target.indexOf(',') < 0) return this.sendReply('/takemoney [user], [amount] - Take a certain amount of money from a user.');

      let parts = target.split(',');
      this.splitTarget(parts[0]);
      let amount = Number(parts[1].trim());
      let currency = currency_name;

      if (!this.targetUser) return this.sendReply(`User ${this.targetUsername} not found.`);
      if (is.not.number(amount)) return this.sendReply('Must be a number.');
      if (is.decimal(amount)) return this.sendReply('Cannot contain a decimal.');
      if (amount < 1) return this.sendReply(`You can't give less than one ${currency}.`);
      if (amount >= 2) currency += 's';

      Economy.take(this.targetUsername.toLowerCase(), amount, function(total) {
        let cash = total >= 2 ? currency_name + 's' : currency_name;
        this.sendReply(`${this.targetUsername} was losted ${amount} ${currency}. This user now has ${total} ${cash}.`);
        Users.get(this.targetUsername).send(`${user.name} has taken ${amount} ${currency} from you. You now have ${total} ${cash}.`);
      }.bind(this));
    }
  };

  Object.merge(CommandParser.commands, commands);
}
