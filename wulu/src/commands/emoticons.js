import {emotes} from '../emoticons';

let emotes_name = Object.keys(emotes);
let emotes_list = [];
let len = emotes_name.length;

while (len--) {
  emotes_list.push(`${emotes[emotes_name[len]]} ${emotes_name[len]}`);
}

export default emoticons;

function emoticons() {
  var commands = {
    emotes: 'emoticons',
    emoticons(target, room, user) {

      console.log(emotes_list);
      this.sendReplyBox(`
        <table border="1" cellspacing="0" cellpadding="5" width="100%">
          <tbody>
            <tr>
              <th>List of Emoticons</th>
            </tr>
          </tbody>
        </table>                  
      `);
    }
  }; 

  Object.merge(CommandParser.commands, commands);
}
