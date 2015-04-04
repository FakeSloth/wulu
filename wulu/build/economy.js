'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _User = require('./user');

var _User2 = _interopRequireWildcard(_User);

exports['default'] = {

  currency_name: 'buck',

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
    _User2['default'].findOne({ name: name }, function (err, user) {
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
    _User2['default'].findOne({ name: name }, function (err, user) {
      if (err) return;
      if (!user) {
        user = new _User2['default']({
          name: name.toLowerCase(),
          money: amount
        });
        return user.save(function (err) {
          if (err) return;
          if (callback) callback(user.money);
        });
      }
      user.money += amount;
      user.save(function (err) {
        if (err) return;
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
    _User2['default'].findOne({ name: name }, function (err, user) {
      if (err) return;
      if (!user) return;
      user.money -= amount;
      user.save(function (err) {
        if (err) return;
        if (callback) callback(user.money);
      });
    });
  }

};
module.exports = exports['default'];