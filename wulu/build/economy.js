"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var User = _interopRequire(require("./user"));

module.exports = {

  /**
   * Get a user money amount
   *
   * Example:
   * get('CreaturePhil', function(money) {
   *   // do stuff with money
   * })
   *
   * @param {String} name
   * @param {Function} callback
   */
  get: function get(name, callback) {
    User.findOne({ name: name }, function (err, user) {
      if (err) return;
      if (!user) return callback(0);
      callback(user.money);
    });
  },

  /**
   * Give a user a certain amount of money.
   *
   * @param {String} name
   * @param {Number} amount
   * @param {Function} callback
   */
  give: function give(name, amount, callback) {
    User.findOne({ name: name }, function (err, user) {
      if (err) return;
      if (!user) {
        user = new User({
          name: name.toLowerCase(),
          money: amount
        });
        return user.save(function (err) {
          if (err) return callback(0);
          callback(user.money);
        });
      }
      user.money += amount;
      user.save(function (err) {
        if (err) return callback(0);
        if (callback) callback(user.money);
      });
    });
  },

  /**
   * Take a certain amount from a user.
   * Users who have not been in the database yet
   * will not be deducted of money.
   *
   * @param {String} name
   * @param {Number} amount
   * @param {Function} callback
   */
  take: function take(name, amount, callback) {
    User.findOne({ name: name }, function (err, user) {
      if (err) return;
      if (!user) return callback(0);
      user.money -= amount;
      user.save(function (err) {
        if (err) return callback(0);
        if (callback) callback(user.money);
      });
    });
  }

};