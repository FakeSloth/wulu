"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var away = _interopRequire(require("./commands/away"));

var poof = _interopRequire(require("./commands/poof"));

module.exports = {
  init: function init() {
    away();
    poof();
  },
  away: away,
  poof: poof
};