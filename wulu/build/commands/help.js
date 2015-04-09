'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = help;

function check(arr, target) {
  return arr.indexOf(target) >= 0;
}

var display = '<center><b>List of commands:</b></center>\n              <b>/alias</b> <i>command</i> - Get all aliases of a command.\n              <b>/away</b> - Set yourself away.\n              <b>/back</b> - Set yourself back from away.\n              <b>/buy</b> <i>command</i> - Buys an item from the shop.\n              <b>/customsymbol</b> <i>symbol</i> - Get a custom symbol.\n              <b>/define</b> <i>word</i> - Shows the definition of a word.\n              <b>/emotes</b> - Get a list of emoticons.\n              <b>/poof</b> - Disconnects the user and leaves a message in the room.\n              <b>/regdate</b> <i>user</i> - Shows registration date of the user.\n              <b>/resetsymbol</b> - Reset custom symbol if you have one.\n              <b>/shop</b> - Displays the shop.\n              <b>/transfer</b> <i>user</i>, <i>amount</i> - Transfer a certain amount of money to a user.\n              <b>/urbandefine</b> <i>word</i> - Shows the urban definition of the word.\n              <b>/wallet</b> <i>user</i> - Displays how much money a user has. Parameter is optional.\n              <b>/wulu</b> - Shows the version of wulu the server is using.\n              '.replace(/(\r\n|\n|\r)/gm, '<br>');

function help() {
  var commands = {
    serverhelp: 'commands',
    wuluhelp: 'commands',
    cmd: 'commands',
    cmds: 'commands',
    command: 'commands',
    commands: function commands(target) {
      if (!this.canBroadcast()) {
        return;
      }if (!target) {
        this.sendReplyBox(display);
      }
    },

    alias: function alias(target) {
      if (!this.canBroadcast()) {
        return;
      }if (!target) {
        return this.sendReply('/alias [command] - Get all aliases of a command.');
      }if (check(['serverhelp', 'wuluhelp', 'command', 'commands', 'cmd', 'cmds'], target)) {
        return this.sendReply('/serverhelp, /wuluhelp, /command, /commands, /cmd, /cmds');
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
      this.sendReply('Alias not found for this command');
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];