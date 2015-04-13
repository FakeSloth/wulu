'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _color = require('../color');

var _color2 = _interopRequireWildcard(_color);

var _is = require('is_js');

var _is2 = _interopRequireWildcard(_is);

var emotes = {
  feelsbd: 'http://i.imgur.com/YyEdmwX.png',
  feelsdd: 'http://i.imgur.com/fXtdLtV.png',
  feelsgd: 'http://i.imgur.com/Jf0n4BL.png',
  feelsgn: 'http://i.imgur.com/juJQh0J.png',
  feelsmd: 'http://i.imgur.com/DJHMdSw.png',
  feelsnv: 'http://i.imgur.com/XF6kIdJ.png',
  feelsok: 'http://i.imgur.com/gu3Osve.png',
  feelspink: 'http://i.imgur.com/jqfB8Di.png',
  feelsrs: 'http://i.imgur.com/qGEot0R.png',
  feelssc: 'http://i.imgur.com/cm6oTZ1.png',
  Kappa: 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png',
  niglol: 'http://i.imgur.com/SlzCghq.png',
  Obama: 'http://i.imgur.com/rBA9M7A.png',
  oshit: 'http://i.imgur.com/yr5DjuZ.png',
  PJSalt: 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-18be1a297459453f-36x30.png',
  Sanic: 'http://i.imgur.com/Y6etmna.png',
  wtfman: 'http://i.imgur.com/kwR8Re9.png',
  xD: 'http://i.imgur.com/V728AvL.png'
};

var emotes_keys = Object.keys(emotes);

var patternRegex = createPatternRegex();

var MAX_MESSAGE_LENGTH = 300;

exports['default'] = {
  emotes: emotes,
  Emoticons: Emoticons
};

/**
 * Emoticons
 *
 * @param {Object} _emotes
 */

function Emoticons() {
  var _emotes = arguments[0] === undefined ? emotes : arguments[0];

  if (!CommandParser.originalParse) {
    CommandParser.originalParse = CommandParser.parse;
  }

  CommandParser.parse = function (message, room, user, connection, levelsDeep) {
    message = CommandParser.originalParse(message, room, user, connection, levelsDeep);
    if (!message) return;

    var match = false;
    var len = emotes_keys.length;

    while (len--) {
      if (message.indexOf(emotes_keys[len]) >= 0) {
        match = true;
        break;
      }
    }

    if (!match) return message;

    // escape HTML
    message = Tools.escapeHTML(message);

    // emoticons
    message = message.replace(patternRegex, function (match) {
      var emote = _emotes[match];
      return _is2['default'].string(emote) ? '<img src="' + emote + '" title="' + match + '" />' : match;
    });

    // __italics__
    message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>');

    // **bold**
    message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>');

    room.addRaw('<div class="chat"><small>' + user.getIdentity().charAt(0) + '</small><button name="parseCommand" value="/user ' + user.name + '" class="emote-chat"><b><font class="emote-pointer" color="' + _color2['default'](user.userid) + '">' + user.name + ':</font></b></button><em class="mine">' + message + '</div>');

    return false;
  };
}

function createPatternRegex() {
  var patterns = [];
  var metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

  for (var i in emotes) {
    if (emotes.hasOwnProperty(i)) {
      patterns.push('(' + i.replace(metachars, '\\$&') + ')');
    }
  }

  return new RegExp(patterns.join('|'), 'g');
}
module.exports = exports['default'];