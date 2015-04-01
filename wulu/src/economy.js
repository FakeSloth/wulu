import User from './user';

export default {

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
  get(name, callback) {
    User.findOne({ name: name }, (err, user) => {
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
  give(name, amount, callback) {
    User.findOne({ name: name }, (err, user) => {
      if (err) return;
      if (!user) {
        user = new User({
          name: name.toLowerCase(),
          money: amount
        });
        return user.save((err) => {
          if (err) return callback(0);
          callback(user.money);
        });
      }
      user.money += amount;
      user.save((err) => {
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
  take(name, amount, callback) {
    User.findOne({ name: name }, (err, user) => {
      if (err) return;
      if (!user) return callback(0);
      user.money -= amount;
      user.save((err) => {
        if (err) return callback(0);
        if (callback) callback(user.money);
      });
    });
  }

};

