'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Bot = require('./build/bot');

var _Bot2 = _interopRequireWildcard(_Bot);

var _Commands = require('./build/commands');

var _Commands2 = _interopRequireWildcard(_Commands);

var _Economy = require('./build/economy');

var _Economy2 = _interopRequireWildcard(_Economy);

var _Emoticons = require('./build/emoticons');

var _Mongo = require('./build/mongo');

var _Mongo2 = _interopRequireWildcard(_Mongo);

var _Poll = require('./build/poll');

var _Poll2 = _interopRequireWildcard(_Poll);

var _Sysop = require('./build/sysop');

var _Sysop2 = _interopRequireWildcard(_Sysop);

var _Tour = require('./build/tour');

var _Tour2 = _interopRequireWildcard(_Tour);

var _UserMod = require('./build/usermod');

var _UserMod2 = _interopRequireWildcard(_UserMod);

exports['default'] = {
  Bot: _Bot2['default'],
  Commands: _Commands2['default'],
  Economy: _Economy2['default'],
  Emoticons: _Emoticons.Emoticons,
  Mongo: _Mongo2['default'],
  Poll: _Poll2['default'],
  Sysop: _Sysop2['default'],
  Tour: _Tour2['default'],
  UserMod: _UserMod2['default']
};
module.exports = exports['default'];