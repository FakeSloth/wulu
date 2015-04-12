export default help;

function check(arr, target) {
  return arr.indexOf(target) >= 0;
}

let display = `<center><b>List of commands:</b></center>
              <b>/alias</b> <i>command</i> - Get all aliases of a command.
              <b>/away</b> - Set yourself away.
              <b>/back</b> - Set yourself back from away.
              <b>/buy</b> <i>command</i> - Buys an item from the shop.
              <b>/customsymbol</b> <i>symbol</i> - Get a custom symbol.
              <b>/define</b> <i>word</i> - Shows the definition of a word.
              <b>/emotes</b> - Get a list of emoticons.
              <b>/poof</b> - Disconnects the user and leaves a message in the room.
              <b>/regdate</b> <i>user</i> - Shows registration date of the user.
              <b>/resetsymbol</b> - Reset custom symbol if you have one.
              <b>/seen</b> <i>username</i> - Shows when the user last connected on the server.
              <b>/shop</b> - Displays the shop.
              <b>/transfer</b> <i>user</i>, <i>amount</i> - Transfer a certain amount of money to a user.
              <b>/urbandefine</b> <i>word</i> - Shows the urban definition of the word.
              <b>/wallet</b> <i>user</i> - Displays how much money a user has. Parameter is optional.
              <b>/wulu</b> - Shows the version of wulu the server is using.
              `.replace(/(\r\n|\n|\r)/gm, '<br>');

function help() {
  let commands = {
    serverhelp: 'wuluhelp',
    cmds: 'wuluhelp',
    wuluhelp(target) {
      if (!this.canBroadcast()) return;
      if (!target) {
        this.sendReplyBox(display);
      }
    },

    alias(target) {
      if (!this.canBroadcast()) return;
      if (!target) return this.sendReply('/alias [command] - Get all aliases of a command.');
      if (check(['serverhelp', 'wuluhelp', 'cmds'], target)) {
        return this.sendReply('/serverhelp, /wuluhelp, /cmds');
      }
      if (check(['emotes', 'emoticons'], target)) {
        return this.sendReply('/emotes, /emoticons');
      }
      if (check(['wallet', 'atm', 'purse'], target)) {
        return this.sendReply('/wallet, /atm, /purse');
      }
      if (check(['transfer', 'transfermoney'], target)) {
        return this.sendReply('/transfer, /transfermoney');
      }
      if (check(['poof', 'd', 'cpoof'], target)) {
        return this.sendReply('/poof, /d, /cpoof');
      }
      if (check(['def', 'define'], target)) {
        return this.sendReply('/def, /define');
      }
      if (check(['u', 'ud', 'urbandefine'], target)) {
        return this.sendReply('/u, /ud, /urbandefine');
      }
      if (check(['pmall', 'masspm'], target)) {
        return this.sendReply('/pmall, /masspm');
      }
      if (check(['resetsymbol', 'resetcustomsymbol'], target)) {
        return this.sendReply('/resetsymbol, /resetcustomsymbol');
      }
      this.sendReply('Alias not found for this command');
    }
  };

  Object.merge(CommandParser.commands, commands);
}
