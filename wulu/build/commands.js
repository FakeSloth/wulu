"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var away = _interopRequire(require("./commands/away"));

module.exports = {
  init: function init() {
    away();
  },
  away: away
};