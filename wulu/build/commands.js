'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

var _away = require('./commands/away');

var away = _interopRequire(_away);

var _emoticons = require('./commands/emoticons');

var emoticons = _interopRequire(_emoticons);

var _money = require('./commands/money');

var money = _interopRequire(_money);

var _poof = require('./commands/poof');

var poof = _interopRequire(_poof);

var _shop = require('./commands/shop');

var shop = _interopRequire(_shop);

module.exports = {
  init: function init() {
    away();
    emoticons();
    money();
    poof();
    shop();
  },
  away: away,
  emoticons: emoticons,
  money: money,
  poof: poof,
  shop: shop
};