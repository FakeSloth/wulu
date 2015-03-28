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
   * Give a user a certain amount of money
   *
   * Example:
   * give(5).to('CreaturePhil')
   *
   * @param {Number} amount
   * @return {Object}
   */
  give: function give(amount) {
    return {
      to: generator("+")
    };
  },

  /**
   * Take a certain amount of money from a user
   *
   * Example:
   * take(5).from('CreaturePhil')
   *
   * @param {Number} amount
   * @return {Object}
   */
  take: function take(amount) {
    return {
      /**
       * @param {String} name
       */
      from: function from(name) {
        User.findOne({ name: name }, function (err, user) {
          if (err || !user) return err;
          user.money -= amount;
          user.save();
        });
      }
    };
  }
};

function generator(type) {
  return function (amount) {
    return {
      from: handleGenerate("-"),
      to: handleGenerate("+")
    };
  };
}

function handleGenerate(sign) {
  return function (name) {
    User.findOne({ name: name }, function (err, user) {
      if (err || !user) return err;
      if (sign === "+") {
        user.money += amount;
      } else {
        user.money -= amount;
      }
      user.save(function (err) {
        if (err) return err;
        then();
      });
    });

    return then;
  };
}