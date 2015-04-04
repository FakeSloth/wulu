'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireWildcard(_http);

exports['default'] = regdate;

function regdate() {
  var commands = {
    regdate: function regdate(target, room) {
      if (!this.canBroadcast()) {
        return;
      }if (!target || target == '.' || target == ',' || target == '\'') {
        return this.sendReply('/regdate [user] - Shows registration date of the user.');
      }
      var username = Tools.escapeHTML(target);
      target = target.replace(/\s+/g, '');

      var options = {
        host: 'www.pokemonshowdown.com',
        port: 80,
        path: '/forum/~' + target
      };

      var content = '';
      var data = '';
      var self = this;
      var req = _http2['default'].request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          return content += chunk;
        });
        res.on('end', function () {
          content = content.split('<em');
          if (content[1]) {
            content = content[1].split('</p>');
            if (content[0]) {
              content = content[0].split('</em>');
              if (content[1]) {
                var _regdate = content[1].trim();
                data = '' + username + ' was registered on ' + _regdate + '.';
              }
            }
          } else {
            data = '' + username + ' is not registered.';
          }
          self.sendReplyBox(data);
          room.update();
        });
      });
      req.end();
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];