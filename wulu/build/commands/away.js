'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = away;

var bubbleLetterMap = new Map([['a', 'ⓐ'], ['b', 'ⓑ'], ['c', 'ⓒ'], ['d', 'ⓓ'], ['e', 'ⓔ'], ['f', 'ⓕ'], ['g', 'ⓖ'], ['h', 'ⓗ'], ['i', 'ⓘ'], ['j', 'ⓙ'], ['k', 'ⓚ'], ['l', 'ⓛ'], ['m', 'ⓜ'], ['n', 'ⓝ'], ['o', 'ⓞ'], ['p', 'ⓟ'], ['q', 'ⓠ'], ['r', 'ⓡ'], ['s', 'ⓢ'], ['t', 'ⓣ'], ['u', 'ⓤ'], ['v', 'ⓥ'], ['w', 'ⓦ'], ['x', 'ⓧ'], ['y', 'ⓨ'], ['z', 'ⓩ'], ['A', 'Ⓐ'], ['B', 'Ⓑ'], ['C', 'Ⓒ'], ['D', 'Ⓓ'], ['E', 'Ⓔ'], ['F', 'Ⓕ'], ['G', 'Ⓖ'], ['H', 'Ⓗ'], ['I', 'Ⓘ'], ['J', 'Ⓙ'], ['K', 'Ⓚ'], ['L', 'Ⓛ'], ['M', 'Ⓜ'], ['N', 'Ⓝ'], ['O', 'Ⓞ'], ['P', 'Ⓟ'], ['Q', 'Ⓠ'], ['R', 'Ⓡ'], ['S', 'Ⓢ'], ['T', 'Ⓣ'], ['U', 'Ⓤ'], ['V', 'Ⓥ'], ['W', 'Ⓦ'], ['X', 'Ⓧ'], ['Y', 'Ⓨ'], ['Z', 'Ⓩ'], ['1', '①'], ['2', '②'], ['3', '③'], ['4', '④'], ['5', '⑤'], ['6', '⑥'], ['7', '⑦'], ['8', '⑧'], ['9', '⑨'], ['0', '⓪']]);

var asciiMap = new Map([['ⓐ', 'a'], ['ⓑ', 'b'], ['ⓒ', 'c'], ['ⓓ', 'd'], ['ⓔ', 'e'], ['ⓕ', 'f'], ['ⓖ', 'g'], ['ⓗ', 'h'], ['ⓘ', 'i'], ['ⓙ', 'j'], ['ⓚ', 'k'], ['ⓛ', 'l'], ['ⓜ', 'm'], ['ⓝ', 'n'], ['ⓞ', 'o'], ['ⓟ', 'p'], ['ⓠ', 'q'], ['ⓡ', 'r'], ['ⓢ', 's'], ['ⓣ', 't'], ['ⓤ', 'u'], ['ⓥ', 'v'], ['ⓦ', 'w'], ['ⓧ', 'x'], ['ⓨ', 'y'], ['ⓩ', 'z'], ['Ⓐ', 'A'], ['Ⓑ', 'B'], ['Ⓒ', 'C'], ['Ⓓ', 'D'], ['Ⓔ', 'E'], ['Ⓕ', 'F'], ['Ⓖ', 'G'], ['Ⓗ', 'H'], ['Ⓘ', 'I'], ['Ⓙ', 'J'], ['Ⓚ', 'K'], ['Ⓛ', 'L'], ['Ⓜ', 'M'], ['Ⓝ', 'N'], ['Ⓞ', 'O'], ['Ⓟ', 'P'], ['Ⓠ', 'Q'], ['Ⓡ', 'R'], ['Ⓢ', 'S'], ['Ⓣ', 'T'], ['Ⓤ', 'U'], ['Ⓥ', 'V'], ['Ⓦ', 'W'], ['Ⓧ', 'X'], ['Ⓨ', 'Y'], ['Ⓩ', 'Z'], ['①', '1'], ['②', '2'], ['③', '3'], ['④', '4'], ['⑤', '5'], ['⑥', '6'], ['⑦', '7'], ['⑧', '8'], ['⑨', '9'], ['⓪', '0']]);

/**
 * Sets user away or back.
 */

function away() {
  var parseStatus = function parseStatus(text, encoding) {
    if (encoding) {
      text = text.split('').map(function (char) {
        return bubbleLetterMap.get(char);
      }).join('');
    } else {
      text = text.split('').map(function (char) {
        return asciiMap.get(char);
      }).join('');
    }
    return text;
  };

  var commands = {
    afk: function afk(target, room, user) {
      this.parse('/away AFK', room, user);
    },
    busy: function busy(target, room, user) {
      this.parse('/away BUSY', room, user);
    },
    work: function work(target, room, user) {
      this.parse('/away WORK', room, user);
    },
    working: function working(target, room, user) {
      this.parse('/away WORKING', room, user);
    },
    eating: function eating(target, room, user) {
      this.parse('/away EATING', room, user);
    },
    gaming: function gaming(target, room, user) {
      this.parse('/away GAMING', room, user);
    },
    sleep: function sleep(target, room, user) {
      this.parse('/away SLEEP', room, user);
    },
    mimis: function mimis(target, room, user) {
      this.parse('/away MIMIS', room, user);
    },
    sleeping: function sleeping(target, room, user) {
      this.parse('/away SLEEPING', room, user);
    },
    fap: function fap(target, room, user) {
      this.parse('/away FAP', room, user);
    },
    fapping: function fapping(target, room, user) {
      this.parse('/away FAPPING', room, user);
    },
    away: function away(target, room, user) {
      if (!user.isAway && user.name.length > 15) {
        return this.sendReply('Your username is too long for any kind of use of this command.');
      }target = target ? target.replace(/[^a-zA-Z0-9]/g, '') : 'AWAY';
      var newName = user.name;
      var status = parseStatus(target, true);
      var statusLen = status.length;
      if (statusLen > 14) {
        return this.sendReply('Your away status should be short and to-the-point, not a dissertation on why you are away.');
      }

      if (user.isAway) {
        var statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/);
        if (statusIdx > -1) newName = newName.substr(0, statusIdx);
        if (user.name.substr(-statusLen) === status) {
          return this.sendReply('Your away statis is already set to "' + target + '".');
        }
      }

      newName += ' - ' + status;
      if (newName.length > 18) {
        return this.sendReply('"' + target + '" is too long to use as your away status.');
      } // forcerename any possible impersonators
      var targetUser = Users.getExact(user.userid + target);
      if (targetUser && targetUser !== user && targetUser.name === user.name + ' - ' + target) {
        targetUser.resetName();
        targetUser.send('|nametaken|Your name conflicts with ' + user.name + (user.name.substr(-1) === 's' ? '\'' : '\'s') + ' new away status.');
      }

      if (user.can('lock', null, room)) this.add('|raw|-- <b>' + Tools.escapeHTML(user.name) + '</b> is now ' + target.toLowerCase() + '.');
      user.forceRename(newName, user.registered);
      user.updateIdentity();
      user.isAway = true;
    },

    back: function back(target, room, user) {
      if (!user.isAway) {
        return this.sendReply('You are not set as away.');
      }user.isAway = false;

      var newName = user.name;
      var statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/);
      if (statusIdx < 0) {
        user.isAway = false;
        if (user.can('lock', null, room)) this.add('|raw|-- <b>' + Tools.escapeHTML(user.name) + '</b> is no longer away.');
        return false;
      }

      var status = parseStatus(newName.substr(statusIdx + 3), false);
      newName = newName.substr(0, statusIdx);
      user.forceRename(newName, user.registered);
      user.updateIdentity();
      user.isAway = false;
      if (user.can('lock', null, room)) this.add('|raw|-- <b>' + Tools.escapeHTML(user.name) + '</b> is no longer ' + status.toLowerCase() + '.');
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];