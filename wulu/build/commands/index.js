'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

var _away = require('./away');

var away = _interopRequire(_away);

var _emoticons = require('./emoticons');

var emoticons = _interopRequire(_emoticons);

var _help = require('./help');

var help = _interopRequire(_help);

var _money = require('./money');

var money = _interopRequire(_money);

var _poof = require('./poof');

var poof = _interopRequire(_poof);

var _poll = require('./poll');

var poll = _interopRequire(_poll);

var _reload = require('./reload');

var reload = _interopRequire(_reload);

var _shop = require('./shop');

var shop = _interopRequire(_shop);

var commands = {
  away: away,
  emoticons: emoticons,
  help: help,
  money: money,
  poof: poof,
  poll: poll,
  reload: reload,
  shop: shop
};

commands.init = function () {
  Object.each(commands, function (command) {
    if (command === 'init') return;
    commands[command]();
  });
};

module.exports = commands;