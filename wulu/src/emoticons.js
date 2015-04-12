import color from '../color';
import is from 'is_js';

let emotes = {
  'FakeSloth': 'http://i.imgur.com/chqy1tA.png',
  'feelsbd': 'http://i.imgur.com/YyEdmwX.png',
  'feelsdd': 'http://i.imgur.com/fXtdLtV.png',
  'feelsgd': 'http://i.imgur.com/Jf0n4BL.png',
  'feelsgn': 'http://i.imgur.com/juJQh0J.png',
  'feelsmd': 'http://i.imgur.com/DJHMdSw.png',
  'feelsnv': 'http://i.imgur.com/XF6kIdJ.png',
  'feelsok': 'http://i.imgur.com/gu3Osve.png',
  'feelspink': 'http://i.imgur.com/jqfB8Di.png',
  'feelsrs': 'http://i.imgur.com/qGEot0R.png',
  'feelssc': 'http://i.imgur.com/cm6oTZ1.png',
  'fukya': 'http://i.imgur.com/ampqCZi.gif',
  'Kappa': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png',
  'niglol': 'http://i.imgur.com/SlzCghq.png',
  'Obama': 'http://i.imgur.com/rBA9M7A.png',
  'oshit': 'http://i.imgur.com/yr5DjuZ.png',
  'PJSalt': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-18be1a297459453f-36x30.png',
  'Sanic': 'http://i.imgur.com/Y6etmna.png',
  'wtfman': 'http://i.imgur.com/kwR8Re9.png',
  'xD': 'http://i.imgur.com/V728AvL.png'
};

let emotes_keys = Object.keys(emotes);

let patternRegex = createPatternRegex();

const MAX_MESSAGE_LENGTH = 300;

export default {
  emotes,
  Emoticons
};

/**
 * Emoticons
 *
 * @param {Object} _emotes
 */

function Emoticons(_emotes=emotes) {
  if (!CommandParser.originalParse) {
    CommandParser.originalParse = CommandParser.parse;
  }

  CommandParser.parse = function(message, room, user, connection, levelsDeep) {
    if ((message.charAt(0) === '/' && message.charAt(1) !== '/') || message.charAt(0) === '!') {
      return CommandParser.originalParse(message, room, user, connection, levelsDeep);
    }

    let match = false;
    let len = emotes_keys.length;

    while(len--) {
      if (message.indexOf(emotes_keys[len]) >= 0) {
        match = true;
        break;
      }
    }

    if (!match) return CommandParser.originalParse(message, room, user, connection, levelsDeep);

    if (message.length > MAX_MESSAGE_LENGTH && !user.can('ignorelimits')) {
      connection.popup('Your message is too long:\n\n' + message);
      return false;
    }

    // escape HTML
    message = Tools.escapeHTML(message);

    // emoticons
    message = message.replace(patternRegex, (match) => {
      let emote = _emotes[match];
      return is.string(emote) ? `<img src="${emote}" title="${match}" />`: match;
    });

    // __italics__
    message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>');

    // **bold**
    message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>');

    room.addRaw(`<div class="chat"><small>${user.getIdentity().charAt(0)}</small><button name="parseCommand" value="/user ${user.name}" class="emote-chat"><b><font class="emote-pointer" color="${color(user.userid)}">${user.name}:</font></b></button><em class="mine">${message}</div>`);

    return false;
  };
}

function createPatternRegex() {
  let patterns = [];
  let metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

  for (let i in emotes) {
    if (emotes.hasOwnProperty(i)) {
      patterns.push('(' + i.replace(metachars, '\\$&') + ')');
    }
  }

  return new RegExp(patterns.join('|'), 'g');
}
