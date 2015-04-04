'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _emotes = require('../emoticons');

exports['default'] = emoticons;

var emotes_table = create_table();

function emoticons() {
  var commands = {
    emotes: 'emoticons',
    emoticons: function emoticons() {
      if (!this.canBroadcast()) {
        return;
      }this.sendReplyBox(emotes_table);
    }
  };

  Object.merge(CommandParser.commands, commands);
}

/**
 * Create a two column table listing emoticons.
 *
 * @return {String} emotes table
 */

function create_table() {
  var emotes_name = Object.keys(_emotes.emotes);
  var emotes_list = [];
  var emotes_group_list = [];
  var len = emotes_name.length;

  for (var i = 0; i < len; i++) {
    emotes_list.push('<td><img src="' + _emotes.emotes[emotes_name[i]] + '" title="' + emotes_name[i] + '"> ' + emotes_name[i] + '</td>');
  }

  var emotes_list_right = emotes_list.splice(len / 2, len / 2);

  for (var i = 0; i < len / 2; i++) {
    var emote1 = emotes_list[i],
        emote2 = emotes_list_right[i];
    if (emote2) {
      emotes_group_list.push('<tr>' + emote1 + '' + emote2 + '</tr>');
    } else {
      emotes_group_list.push('<tr>' + emote1 + '</tr>');
    }
  }

  return ('<center><b><u>List of Emoticons</u></b></center>\n          <table border="1" cellspacing="0" cellpadding="5" width="100%">\n            <tbody>\n              ' + emotes_group_list.join('') + '\n            </tbody>\n          </table>\n        ').replace(/(\r\n|\n|\r)/gm, '');
}
module.exports = exports['default'];