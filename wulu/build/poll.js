'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = poll;

function poll() {
  var Poll = {};

  /**
   * Resets to a poll default properties.
   *
   * @param {String} roomid
   */

  Poll.reset = function (roomId) {
    Poll[roomId] = {
      question: null,
      optionList: [],
      options: {},
      display: ''
    };
  };

  /**
   * Splits up targets and trim each part.
   *
   * @param {String} target
   * @return {Array} parts
   */

  Poll.splint = function (target) {
    var parts = target.split(',');
    var len = parts.length;
    while (len--) {
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

  Poll.create = function (options, roomPoll, user) {
    options = options.join(',').toLowerCase().split(',');
    roomPoll.optionList = options;
    roomPoll.question = options.shift();
    var pollOptions = '';
    var start = 0;

    while (start < roomPoll.optionList.length) {
      pollOptions += '<button name="send" value="/vote ' + Tools.escapeHTML(roomPoll.optionList[start]) + '">' + Tools.escapeHTML(roomPoll.optionList[start]) + '</button> ';
      start++;
    }

    roomPoll.display = ('<h2>' + Tools.escapeHTML(roomPoll.question) + '  <font size="1" color="#AAAAAA">/vote OPTION</font><br>\n                        <font size="1" color="#aaaaaa">Poll started by <i>' + user.name + '</i></font><br>\n                        <hr>    ' + pollOptions).replace(/(\r\n|\n|\r)/gm, '');
  };

  /**
   * End the poll and get the results.
   *
   * @param {Object} roomPoll
   * @param {Number} votes
   * @return {String} results
   */

  Poll.end = function (roomPoll, votes) {
    var options = {};
    var data = [];

    Object.each(roomPoll.optionList, function (choice) {
      options[roomPoll.optionList[choice]] = 0;
    });
    Object.each(roomPoll.options, function (option) {
      options[roomPoll.options[option]]++;
    });
    Object.each(options, function (option) {
      data.push([option, options[option]]);
    });
    data.sort(function (a, b) {
      return a[1] - b[1];
    });

    var results = '';
    var len = data.length;
    while (len--) {
      if (data[len][1] > 0) {
        results += '&bull; ' + Tools.escapeHTML(data[len][0]) + ' - ' + Math.floor(data[len][1] / votes * 100) + '% (' + data[len][1] + ')<br>';
      }
    }

    return results;
  };

  for (var id in Rooms.rooms) {
    if (Rooms.rooms[id].type === 'chat' && !Poll[id]) {
      Poll[id] = {};
      Poll.reset(id);
    }
  }

  return Poll;
}
module.exports = exports['default'];