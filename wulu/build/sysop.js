"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sysop;

function sysop() {
  var systemOperators = arguments[0] === undefined ? [] : arguments[0];

  Users.User.prototype.hasSysopAccess = function () {
    if (systemOperators.indexOf(this.userid) > -1 && this.registered) {
      return true;
    } else {
      return false;
    }
  };
}
module.exports = exports["default"];