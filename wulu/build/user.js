'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireWildcard(_mongoose);

var userSchema = new _mongoose2['default'].Schema({
  name: { type: String, lowercase: true, unique: true },
  money: { type: Number, 'default': 0 },
  symbol: String
});

exports['default'] = _mongoose2['default'].model('user', userSchema);
module.exports = exports['default'];