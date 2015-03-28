"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var away = _interopRequire(require("./commands/away"));

var poof = _interopRequire(require("./commands/poof"));

var money = _interopRequire(require("./commands/money"));

module.exports = {
  init: function init() {
    away();
    poof();
    money();
  },
  away: away,
  poof: poof,
  money: money
};