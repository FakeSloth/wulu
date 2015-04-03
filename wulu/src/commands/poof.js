export default poof;

let msgs = [
  'has vanished into nothingness!',
  'used Explosion!',
  'fell into the void.',
  'went into a cave without a repel!',
  'has left the building.',
  'was forced to give StevoDuhHero\'s mom an oil massage!',
  'was hit by Magikarp\'s Revenge!',
  'ate a bomb!',
  'is blasting off again!',
  '(Quit: oh god how did this get here i am not good with computer)',
  'was unfortunate and didn\'t get a cool message.',
  '{{user}}\'s mama accidently kicked {{user}} from the server!'
];

/**
 * Display a message in the lobby and disconnects you from the server.
 *
 * @param {Array} messages
 */

function poof(messages=msgs) {
  let d = 'poof', cpoof = 'poof';
  let commands = {
    d,
    cpoof,
    poof(target, room, user) {
      if (Config.poofOff) return this.sendReply('Poof is currently disabled.');
      if (target && !this.can('broadcast')) return false;
      if (room.id !== 'lobby') return false;

      let message = target || messages[Math.floor(Math.random() * messages.length)];

      if (message.indexOf('{{user}}') < 0) message = `{{user}} ${message}`;

      message = message.replace(/{{user}}/g, user.name);

      if (!this.canTalk(message)) return false;

      let colour = '#' + [1, 1, 1].map(() => {
        let part = Math.floor(Math.random() * 0xaa);
        return (part < 0x10 ? '0' : '') + part.toString(16);
      }).join('');

      room.addRaw(`<b><font color="${colour}">~~ ${Tools.escapeHTML(message)} ~~ </font></b>`);
      user.disconnectAll();
    },

    poofoff: 'nopoof',
    nopoof: function() {
      if (!this.can('poofoff')) return false;
      Config.poofOff = true;
      return this.sendReply('Poof is now disabled.');
    },

    poofon: function() {
      if (!this.can('poofoff')) return false;
      Config.poofOff = false;
      return this.sendReply('Poof is now enabled.');
    }
  };

  Object.merge(CommandParser.commands, commands);
}
