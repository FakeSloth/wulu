'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _jf = require('jsonfile');

var _jf2 = _interopRequireWildcard(_jf);

var _util = require('util');

var _util2 = _interopRequireWildcard(_util);

exports['default'] = wulu;

var version = _jf2['default'].readFileSync(__dirname + '/../../../package.json').version;

/**
 * wulu specific commands.
 */

function wulu() {
  var commands = {
    wulu: function wulu() {
      this.sendReplyBox('This server is using <a href="https://github.com/FakeSloth/wulu">wulu</a> ' + version);
    },

    fakesloth: function fakesloth() {
      this.sendReplyBox('Server sponsored by <a href="https://github.com/FakeSloth">FakeSloth</a>.');
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];