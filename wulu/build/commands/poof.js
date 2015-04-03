'use strict';

module.exports = poof;

var msgs = ['has vanished into nothingness!', 'used Explosion!', 'fell into the void.', 'went into a cave without a repel!', 'has left the building.', 'was forced to give StevoDuhHero\'s mom an oil massage!', 'was hit by Magikarp\'s Revenge!', 'ate a bomb!', 'is blasting off again!', '(Quit: oh god how did this get here i am not good with computer)', 'was unfortunate and didn\'t get a cool message.', '{{user}}\'s mama accidently kicked {{user}} from the server!'];

/**
 * Display a message in the lobby and disconnects you from the server.
 *
 * @param {Array} messages
 */

function poof() {
  var messages = arguments[0] === undefined ? msgs : arguments[0];

  var d = 'poof',
      cpoof = 'poof';
  var commands = {
    d: d,
    cpoof: cpoof,
    poof: function poof(target, room, user) {
      if (Config.poofOff) {
        return this.sendReply('Poof is currently disabled.');
      }if (target && !this.can('broadcast')) {
        return false;
      }if (room.id !== 'lobby') {
        return false;
      }var message = target || messages[Math.floor(Math.random() * messages.length)];

      if (message.indexOf('{{user}}') < 0) message = '{{user}} ' + message;

      message = message.replace(/{{user}}/g, user.name);

      if (!this.canTalk(message)) {
        return false;
      }var colour = '#' + [1, 1, 1].map(function () {
        var part = Math.floor(Math.random() * 170);
        return (part < 16 ? '0' : '') + part.toString(16);
      }).join('');

      room.addRaw('<b><font color="' + colour + '">~~ ' + Tools.escapeHTML(message) + ' ~~ </font></b>');
      user.disconnectAll();
    },

    poofoff: 'nopoof',
    nopoof: function nopoof() {
      if (!this.can('poofoff')) {
        return false;
      }Config.poofOff = true;
      return this.sendReply('Poof is now disabled.');
    },

    poofon: function poofon() {
      if (!this.can('poofoff')) {
        return false;
      }Config.poofOff = false;
      return this.sendReply('Poof is now enabled.');
    }
  };

  Object.merge(CommandParser.commands, commands);
}