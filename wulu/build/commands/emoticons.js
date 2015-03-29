"use strict";

var emotes = require("../emoticons").emotes;

var emotes_name = Object.keys(emotes);
var emotes_list = [];
var len = emotes_name.length;

while (len--) {
  emotes_list.push("" + emotes[emotes_name[len]] + " " + emotes_name[len]);
}

module.exports = emoticons;

function emoticons() {
  var commands = {
    emotes: "emoticons",
    emoticons: function emoticons(target, room, user) {

      console.log(emotes_list);
      this.sendReplyBox("\n        <table border=\"1\" cellspacing=\"0\" cellpadding=\"5\" width=\"100%\">\n          <tbody>\n            <tr>\n              <th>List of Emoticons</th>\n            </tr>\n          </tbody>\n        </table>                  \n      ");
    }
  };

  Object.merge(CommandParser.commands, commands);
}