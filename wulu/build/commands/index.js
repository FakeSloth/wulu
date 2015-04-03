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

var _shop = require('./shop');

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