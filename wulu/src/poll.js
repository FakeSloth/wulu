export default poll;

function poll() {
  let Poll = {};

  /**
   * Resets to a poll default properties.
   *
   * @param {String} roomid
   */

  Poll.reset = (roomId) => {
    Poll[roomId] = {
      question: null,
      optionList: [],
      options: {},
      display: '',
      topOption: ''
    };
  };

  /**
   * Splits up targets and trim each part.
   *
   * @param {String} target
   * @return {Array} parts
   */

  Poll.splint = (target) => {
    let parts = target.split(',');
    let len = parts.length;
    while(len--) {
      parts[len] = parts[len].trim();
    }
    return parts;
  };

  /**
   * Create a Poll.
   *
   * @param {Array} options
   * @param {Object} roomPoll
   * @param {Object} user
   */

  Poll.create = (options, roomPoll, user) => {
    options = options.join(',').toLowerCase().split(',');
    roomPoll.optionList = options;
    roomPoll.question = options.shift();
    let pollOptions = '';
    let start = 0;

    while (start < roomPoll.optionList.length) {
      pollOptions += `<button name="send" value="/vote ${roomPoll.optionList[start]}">${roomPoll.optionList[start]}</button> `;
      start++;
    }

    roomPoll.display = `<h2>${roomPoll.question}  <font size="1" color="#AAAAAA">/vote OPTION</font><br>
                        <font size="1" color="#aaaaaa">Poll started by <i>${user.name}</i></font><br>
                        <hr>    ${pollOptions}`.replace(/(\r\n|\n|\r)/gm, '');
  };

  for (let id in Rooms.rooms) {
    if (Rooms.rooms[id].type === 'chat' && !Poll[id]) {
      Poll[id] = {};
      Poll.reset(id);
    }
  }

  return Poll;
}
