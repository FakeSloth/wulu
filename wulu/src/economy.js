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
   * @return {Function} to
   */
  give(amount) {
    return {
      /**
       * @param {String} name
       */
      to(name) {
        User.findOne({ name: name }, (err, user) => {
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
   * @return {Function} from
   */
  take(amount) {
    return {
      /**
       * @param {String} name
       */
      from(name) {
        User.findOne({ name: name }, (err, user) => {
          if (err) return err;
          user.money -= amount;
          user.save();
        });
      } 
    };
  }
};
