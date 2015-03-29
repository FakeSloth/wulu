"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var color = _interopRequire(require("./color"));

var is = _interopRequire(require("is_js"));

module.exports = emoticons;

var emotes = {
  Kappa: "http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png",
  BloodTrail: "http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f124d3a96eff228a-41x28.png",
  BibleThump: "http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f6c13c7fc0a5c93d-36x30.png",
  feelsgd: "http://i.imgur.com/9gj1oPV.png",
  feelsbd: "http://i.imgur.com/Ehfkalz.gif"
};

var emotes_keys = Object.keys(emotes);

var patternRegex = createPatternRegex();

/**
 * Emoticons
 * To make the button username appear as normal, in your css:
 * .emote-chat {
 *   background: none;
 *   border: 0;
 *   padding: 0 5px 0 0;
 *   cursor: pointer;
 *   font-family: Verdana;
 * }
 *
 * @param {Object} _emotes
 */
function emoticons() {
  var _emotes = arguments[0] === undefined ? emotes : arguments[0];

  if (!CommandParser.originalParse) {
    CommandParser.originalParse = CommandParser.parse;
  }

  CommandParser.parse = function (message, room, user, connection, levelsDeep) {
    var match = false;
    var len = emotes_keys.length;

    while (len--) {
      if (message.indexOf(emotes_keys[len]) >= 0) {
        match = true;
        break;
      }
    }

    if (!match) return CommandParser.originalParse(message, room, user, connection, levelsDeep);

    message = Tools.escapeHTML(message);
    message = message.replace(patternRegex, function (match) {
      var emote = _emotes[match];
      return is.string(emote) ? "<img src=\"" + emote + "\" title=\"" + match + "\" />" : match;
    });

    // __italics__
    message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, "<i>$1</i>");

    // **bold**
    message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, "<b>$1</b>");

    room.addRaw("<div class=\"chat\"><small>" + user.group + "</small><button name=\"parseCommand\" value=\"/user " + user.name + "\" class=\".emote-chat\"><b><font color=\"" + color(user.userid) + "\">" + user.name + ":</font></b></button><em class=\"mine\">" + message + "</div>");

    return false;
  };
}

function createPatternRegex() {
  var patterns = [];
  var metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

  for (var i in emotes) {
    if (emotes.hasOwnProperty(i)) {
      patterns.push("(" + i.replace(metachars, "\\$&") + ")");
    }
  }

  return new RegExp(patterns.join("|"), "g");
}