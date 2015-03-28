"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Bot = _interopRequire(require("./build/bot"));

var Commands = _interopRequire(require("./build/commands"));

var Mongo = _interopRequire(require("./build/mongo"));

module.exports = {
  Bot: Bot,
  Mongo: Mongo,
  Commands: Commands
};