'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _away = require('./away');

var _away2 = _interopRequireWildcard(_away);

var _define = require('./define');

var _define2 = _interopRequireWildcard(_define);

var _emoticons = require('./emoticons');

var _emoticons2 = _interopRequireWildcard(_emoticons);

var _help = require('./help');

var _help2 = _interopRequireWildcard(_help);

var _money = require('./money');

var _money2 = _interopRequireWildcard(_money);

var _poof = require('./poof');

var _poof2 = _interopRequireWildcard(_poof);

var _poll = require('./poll');

var _poll2 = _interopRequireWildcard(_poll);

var _regdate = require('./regdate');

var _regdate2 = _interopRequireWildcard(_regdate);

var _reload = require('./reload');

var _reload2 = _interopRequireWildcard(_reload);

var _shop = require('./shop');

var _shop2 = _interopRequireWildcard(_shop);

var _wulu = require('./wulu');

var _wulu2 = _interopRequireWildcard(_wulu);

var commands = {
  away: _away2['default'],
  define: _define2['default'],
  emoticons: _emoticons2['default'],
  help: _help2['default'],
  money: _money2['default'],
  poof: _poof2['default'],
  poll: _poll2['default'],
  regdate: _regdate2['default'],
  reload: _reload2['default'],
  shop: _shop2['default'],
  wulu: _wulu2['default']
};

commands.init = function () {
  Object.each(commands, function (command) {
    if (command === 'init') return;
    commands[command]();
  });
};

exports['default'] = commands;
module.exports = exports['default'];