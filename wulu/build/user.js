"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var mongoose = _interopRequire(require("mongoose"));

var userSchema = new mongoose.Schema({
  name: { type: String, lowercase: true },
  group: String
});

module.exports = mongoose.model("user", userSchema);