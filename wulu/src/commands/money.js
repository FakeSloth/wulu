import is from 'is_js';
import Economy from '../economy';
import User from '../user';

export default money;

/**
 * Handle money commands from Economy.
 */

function money() {
  let commands = {
    atm: 'wallet',
    purse: 'wallet',
    wallet(target, room, user) {
      if (!this.canBroadcast()) return;
      Economy.get((target || user.userid), function(amount) {
        let currency = Wulu.Economy.currency_name;
        if (amount !== 1) currency += 's';
        this.sendReplyBox(`${target || user.name} has ${amount} ${currency}.`);
        room.update();
      }.bind(this));
    },

    'generatemoney': 'givemoney',
    givemoney(target, room, user) {
      if (!user.can('givemoney')) return false;
      if (!target || target.indexOf(',') < 0) return this.sendReply('/givemoney [user], [amount] - Give a user a certain amount of money.');

      let parts = target.split(',');
      this.splitTarget(parts[0]);
      let amount = Number(parts[1].trim());
      let currency = Wulu.Economy.currency_name;
      let currency_name = Wulu.Economy.currency_name;

      if (!this.targetUser) return this.sendReply(`User ${this.targetUsername} not found.`);
      if (is.not.number(amount)) return this.sendReply('Must be a number.');
      if (is.decimal(amount)) return this.sendReply('Cannot contain a decimal.');
      if (amount < 1) return this.sendReply(`You can't give less than one ${currency}.`);
      if (amount !== 1) currency += 's';

      Economy.give(this.targetUsername, amount, function(total) {
        let cash = total !== 1 ? currency_name + 's' : currency_name;
        this.sendReply(`${this.targetUsername} was given ${amount} ${currency}. This user now has ${total} ${cash}.`);
        Users.get(this.targetUsername).send(`${user.name} has given you ${amount} ${currency}. You now have ${total} ${cash}.`);
      }.bind(this));
    },

    takemoney(target, room, user) {
      if (!user.can('takemoney')) return false;
      if (!target || target.indexOf(',') < 0) return this.sendReply('/takemoney [user], [amount] - Take a certain amount of money from a user.');

      let parts = target.split(',');
      this.splitTarget(parts[0]);
      let amount = Number(parts[1].trim());
      let currency = Wulu.Economy.currency_name;
      let currency_name = Wulu.Economy.currency_name;

      if (!this.targetUser) return this.sendReply(`User ${this.targetUsername} not found.`);
      if (is.not.number(amount)) return this.sendReply('Must be a number.');
      if (is.decimal(amount)) return this.sendReply('Cannot contain a decimal.');
      if (amount < 1) return this.sendReply(`You can't give less than one ${currency}.`);
      if (amount !== 1) currency += 's';

      Economy.take(this.targetUsername, amount, function(total) {
        let cash = total !== 1 ? currency_name + 's' : currency_name;
        this.sendReply(`${this.targetUsername} was losted ${amount} ${currency}. This user now has ${total} ${cash}.`);
        Users.get(this.targetUsername).send(`${user.name} has taken ${amount} ${currency} from you. You now have ${total} ${cash}.`);
      }.bind(this));
    },

    transfer: 'transfermoney',
    transfermoney(target, room, user) {
      if (!target || target.indexOf(',') < 0) return this.sendReply('/transfer [user], [amount] - Transfer a certain amount of money to a user.');

      let parts = target.split(',');
      this.splitTarget(parts[0]);
      let amount = Number(parts[1].trim());
      let currency = Wulu.Economy.currency_name;
      let targetName = this.targetUsername;
      let currency_name = Wulu.Economy.currency_name;

      if (!this.targetUser) return this.sendReply(`User ${targetName} not found.`);
      if (is.not.number(amount)) return this.sendReply('Must be a number.');
      if (is.decimal(amount)) return this.sendReply('Cannot contain a decimal.');
      if (amount < 1) return this.sendReply(`You can't give less than one ${currency}.`);
      if (amount !== 1) currency += 's';

      let self = this;
      Economy.get(user.userid, function(userAmount) {
        if (amount > userAmount) return self.sendReply('You cannot transfer more money than what you have.');
        Economy.give(targetName, amount, function(targetTotal) {
          Economy.take(user.userid, amount, function(userTotal) {
            let targetCash = targetTotal !== 1 ? currency_name + 's' : currency_name;
            let userCash = userTotal !== 1 ? currency_name + 's' : currency_name;
            self.sendReply(`You have successfully transferred ${amount} ${currency} to ${targetName}. You now have ${userTotal} ${userCash}.`);
            self.targetUser.send(`${user.name} has transferred ${amount} ${currency} to you. You now have ${targetTotal} ${targetCash}.`);
          });
        });
      });
    },

    moneyladder: 'richestuser',
    richladder: 'richestuser',
    richestusers: 'richestuser',
    richestuser(target, room) {
      if (!this.canBroadcast()) return;
      let self = this;
      let display = `<center><u><b>Richest Users</b></u></center><br>
                     <table border="1" cellspacing="0" cellpadding="5" width="100%">
                       <tbody>
                         <tr>
                           <th>Rank</th>
                           <th>Username</th>
                           <th>Money</th>
                       </tr>`.replace(/(\r\n|\n|\r)/gm, '');
      User.find().sort({money: -1}).limit(10).exec(function(err, users) {
        if (err) return;
        users.forEach((user, index) => {
          display += `<tr>
                        <td>${index + 1}</td>
                        <td>${user.name}</td>
                        <td>${user.money}</td>
                      </tr>`.replace(/(\r\n|\n|\r)/gm, '');
        });
        display += '</tbody></table>';
        self.sendReply('|raw|' + display);
        room.update();
      });
    }
  };

  Object.merge(CommandParser.commands, commands);
}
