import chalk from 'chalk';
import mongoose from 'mongoose';
import User from './user';

export default {
  connect_database,
  importUsergroups,
  exportUsergroups
};

/**
 * Connect to MongoDB Database.
 */

function connect_database() {
  let url = process.env.MONGODB || 'mongodb://localhost:27017/ps';
  mongoose.connect(url);
  mongoose.connection.on('error', () => console.error(chalk.red('MongoDB Connection Error. Make sure MongoDB is running.')) );
}

/**
 * Get usergroups from MongoDB.
 *
 * @param {Object} usergroups
 * @param {Object} Config
 */

function importUsergroups(usergroups, Config) {
  User.find({}, (err, users) => {
    if (err) return;
    users.forEach((user) => usergroups[user.name] =  (user.group || Config.groupsranking[0]) + user.name );
  });
}

/**
 * Save usergroups to MongoDB.
 *
 * @param {Object} usergroups
 */

function exportUsergroups(usergroups) {
  let users = [];
  for (let i in usergroups) {
    users.push({
      name: usergroups[i].substr(1).replace(/,/g, ''),
      group: usergroups[i].substr(0, 1)
    });
  }
  users.forEach((user) => {
    User.findOne({ name: user.name.toLowerCase() }, (err, userModel) => {
      if (err) return; 
      if (!userModel) {
        user = new User({
          name: user.name,
          group: user.group
        });
        return user.save();
      }
      userModel.group = user.group;
      userModel.save();
    });
  });

  // Demote to regular user
  users = users.map((user) => user.name.toLowerCase());
  User.find({}, (err, usersModel) => {
    if (err) return;
    usersModel.forEach((user) => {
      if (users.indexOf(user.name) < 0) {
        User.findOne({name: user.name}, (err, user) => {
          if (err) return;
          user.group = '';
          user.save();
        });
      }
    });
  });
}
