import {emotes} from '../emoticons';

export default emoticons;

let emotes_table = create_table();

function emoticons() {
  var commands = {
    emotes: 'emoticons',
    emoticons(target, room, user) {
      if (!this.canBroadcast()) return;
      this.sendReplyBox(emotes_table);
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
  let emotes_name = Object.keys(emotes);
  let emotes_list = [];
  let emotes_group_list = [];
  let len = emotes_name.length;

  for (let i = 0; i < len; i++) {
    emotes_list.push(`<td><img src="${emotes[emotes_name[i]]}" title="${emotes_name[i]}"> ${emotes_name[i]}</td>`);
  }

  let emotes_list_right = emotes_list.splice(len/2, len/2);

  for (let i = 0; i < len / 2; i++) {
    let emote1 = emotes_list[i], emote2 = emotes_list_right[i];
    if (emote2) {
      emotes_group_list.push(`<tr>${emotes_list[i]}${emotes_list_right[i]}</tr>`);
    } else {
      emotes_group_list.push(`<tr>${emotes_list[i]}</tr>`);
    }
  }

  return `<center><b><u>List of Emoticons</u></b></center>
          <table border="1" cellspacing="0" cellpadding="5" width="100%">
            <tbody>
              ${emotes_group_list.join('')}
            </tbody>
          </table>                  
        `.replace(/(\r\n|\n|\r)/gm, '');
}
