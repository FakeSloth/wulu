"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var away = _interopRequire(require("./commands/away"));

var emoticons = _interopRequire(require("./commands/emoticons"));

var money = _interopRequire(require("./commands/money"));

var poof = _interopRequire(require("./commands/poof"));

module.exports = {
  init: function init() {
    away();
    emoticons();
    money();
    poof();
  },
  away: away,
  emoticons: emoticons,
  money: money,
  poof: poof
};