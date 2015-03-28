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
   * Give a user a certain amount of money
   *
   * Example:
   * give(5).to('CreaturePhil')
   *
   * @param {Number} amount
   * @return {Object}
   */
  give(amount) {
    return {
      to: generator('+')
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
  take(amount) {
    return {
      /**
       * @param {String} name
       */
      from(name) {
        User.findOne({ name: name }, (err, user) => {
          if (err || !user) return err;
          user.money -= amount;
          user.save();
        });
      }
    };
  }
};

function generator(type) {
  return (amount) => {
    return {
      from: handleGenerate('-'),
      to: handleGenerate('+')
    }
  }
}

function handleGenerate(sign) {
  return (name) => {
    User.findOne({ name: name }, (err, user) => {
      if (err || !user) return err;
      if (sign === '+') {
        user.money += amount;
      } else {
        user.money -= amount;
      }
      user.save((err) => {
        if (err) return err;
        then();
      });
    });
  }
}

function then
