'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _User = require('../usergroup');

var _User2 = _interopRequireWildcard(_User);

exports['default'] = stafflist;

function stafflist() {
  var commands = {
    stafflist: function stafflist() {
      var _this = this;

      var staff = {
        '~': [],
        '&': [],
        '@': [],
        '%': [],
        '+': []
      };
      var numStaff = 0;
      _User2['default'].find(function (err, users) {
        if (err) return;
        users.forEach(function (user) {
          if ('~&@%+'.indexOf(user.group) <= -1 && user.name === 'undefined') return;
          staff[user.group].push(user.name);
          numStaff++;
        });

        _this.popupReply('Administrators:\n--------------------\n' + staff['~'].join(', ') + '\n\nLeaders:\n-------------------- \n' + staff['&'].join(', ') + '\n\nModerators:\n-------------------- \n' + staff['@'].join(', ') + '\n\nDrivers:\n--------------------\n' + staff['%'].join(', ') + '\n\nVoices:\n-------------------- \n' + staff['+'].join(', ') + '\n\n\t\t\t\tTotal Staff Members: ' + numStaff);
      });
    }
  };

  Object.merge(CommandParser.commands, commands);
}
module.exports = exports['default'];