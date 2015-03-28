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
   * @return {Number}
   */
  get: function get(name, callback) {
    User.findOne({ name: name }, function (err, user) {
      if (err) return;
      if (!user) return callback(0);
      callback(user.money);
    });
  },

  /**
   * Give a user a certain amount of money
   *
   * Example:
   * give(5).to('CreaturePhil')
   *
   * @param {Number} amount
   */
  give: function give(amount) {
    return {
      /**
       * @param {String} name
       */
      to: function to(name) {
        User.findOne({ name: name }, function (err, user) {
          if (err) return err;
          user.money += amount;
          user.save();
        });
      }
    };
  },

  /**
   * Take a certain amount of money from a user
   *
   * Example:
   * take(5).from('CreaturePhil')
   *
   * @param {Number} amount
   */
  take: function take(amount) {
    return {
      /**
       * @param {String} name
       */
      from: function from(name) {
        User.findOne({ name: name }, function (err, user) {
          if (err) return err;
          user.money -= amount;
          user.save();
        });
      }
    };
  }
};