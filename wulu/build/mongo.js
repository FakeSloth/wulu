"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var chalk = _interopRequire(require("chalk"));

var mongoose = _interopRequire(require("mongoose"));

var User = _interopRequire(require("./user"));

module.exports = {
  connect_database: connect_database,
  importUsergroups: importUsergroups,
  exportUsergroups: exportUsergroups
};

/**
 * Connect to MongoDB Database.
 */

function connect_database() {
  var url = process.env.MONGODB || "mongodb://localhost:27017/ps";
  mongoose.connect(url);
  mongoose.connection.on("error", function () {
    return console.error(chalk.red("MongoDB Connection Error. Make sure MongoDB is running."));
  });
}

/**
 * Get usergroups from MongoDB.
 *
 * @param {Object} usergroups
 * @param {Object} Config
 */

function importUsergroups(usergroups, Config) {
  User.find({}, function (err, users) {
    if (err) return;
    users.forEach(function (user) {
      return usergroups[user.name] = (user.group || Config.groupsranking[0]) + user.name;
    });
  });
}

/**
 * Save usergroups to MongoDB.
 *
 * @param {Object} usergroups
 */

function exportUsergroups(usergroups) {
  var users = [];
  for (var i in usergroups) {
    users.push({
      name: usergroups[i].substr(1).replace(/,/g, ""),
      group: usergroups[i].substr(0, 1)
    });
  }
  users.forEach(function (user) {
    User.findOne({ name: user.name.toLowerCase() }, function (err, userModel) {
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
  users = users.map(function (user) {
    return user.name.toLowerCase();
  });
  User.find({}, function (err, usersModel) {
    if (err) return;
    usersModel.forEach(function (user) {
      if (users.indexOf(user.name) >= 0) return;
      User.findOne({ name: user.name }, function (err, user) {
        if (err) return;
        user.group = "";
        user.save();
      });
    });
  });
}