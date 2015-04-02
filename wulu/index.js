'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

var _Bot = require('./build/bot');

var Bot = _interopRequire(_Bot);

var _Commands = require('./build/commands');

var Commands = _interopRequire(_Commands);

var _Economy = require('./build/economy');

var Economy = _interopRequire(_Economy);

var _Emoticons = require('./build/emoticons');

var _Mongo = require('./build/mongo');

var Mongo = _interopRequire(_Mongo);

module.exports = {
  Bot: Bot,
  Commands: Commands,
  Economy: Economy,
  Emoticons: _Emoticons.Emoticons,
  Mongo: Mongo
};