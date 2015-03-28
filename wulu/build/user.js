"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var mongoose = _interopRequire(require("mongoose"));

var userSchema = new mongoose.Schema({
  name: { type: String, lowercase: true, unique: true },
  group: { type: String, "default": "" },
  money: { type: Number, "default": 0 }
});

module.exports = mongoose.model("user", userSchema);