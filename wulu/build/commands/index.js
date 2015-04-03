'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

var _away = require('./away');

var away = _interopRequire(_away);

var _emoticons = require('./emoticons');

var emoticons = _interopRequire(_emoticons);

var _money = require('./money');

var money = _interopRequire(_money);

var _poof = require('./poof');

var poof = _interopRequire(_poof);

var _poll = require('./poll');

var poll = _interopRequire(_poll);

var _shop = require('./shop');

var shop = _interopRequire(_shop);

var commands = {
  away: away,
  emoticons: emoticons,
  money: money,
  poof: poof,
  poll: poll,
  shop: shop
};

commands.init = function () {
  Object.each(commands, function (command) {
    if (command === 'init') return;
    commands[command]();
  });
};

module.exports = commands;