export default help;

function check(arr, target) {
  return arr.indexOf(target) >= 0;
}

function help() {
  let commands = {
    serverhelp: 'commands',
    wuluhelp: 'commands',
    cmd: 'commands',
    cmds: 'commands',
    command: 'commands',
    commands(target) {
      if (!this.canBroadcast()) return;
      if (!target) {
        this.sendReplyBox(`<center><b>List of commands:</b></center>
                          <b>/alias</b> <i>command</i> - Get all aliases of a command.
                          <b>/away</b> - Set yourself away.
                          <b>/back</b> - Set yourself back from away.
                          <b>/emotes</b> - Get a list of emoticons.
                          <b>/wallet</b> <i>user</i> - Displays how much money a user has. Parameter is optional.
                          <b>/transfer</b> <i>user</i>, <i>amount</i> - Transfer a certain amount of money to a user.
                          <b>/poof</b> - Disconnects the user and leaves a message in the room.
                          <b>/shop</b> - Displays the shop.
                          <b>/buy</b> <i>command</i> - Buys an item from the shop.
                          <b>/customsymbol</b> <i>symbol</i> - Get a custom symbol.
                          <b>/resetsymbol</b> - Reset custom symbol if you have one.
                          `.replace(/(\r\n|\n|\r)/gm, '<br>'));
      }
    },

    alias(target) {
      if (!this.canBroadcast()) return;
      if (!target) return this.sendReply('/alias [command] - Get all aliases of a command.');
      if (check(['serverhelp', 'wuluhelp', 'command', 'commands', 'cmd', 'cmds'], target)) {
        return this.sendReply('/serverhelp, /wuluhelp, /command, /commands, /cmd, /cmds');
      }
      if (check(['emotes', 'emoticons'], target)) {
        return this.sendReply('/emotes, /emoticons');
      }
      if (check(['wallet', 'atm', 'purse'], target)) {
        return this.sendReply('/wallet, /atm', '/purse');
      }
      if (check(['/transfer', '/transfermoney'], target)) {
        return this.sendReply('/transfer, /transfermoney');
      }
      if (check(['/poof', '/d', '/cpoof'], target)) {
        return this.sendReply('/poof, /d, /cpoof');
      }
      this.sendReply('Alias not found for this command');
    }
  };

  Object.merge(CommandParser.commands, commands);
}
