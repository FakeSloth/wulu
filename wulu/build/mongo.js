'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireWildcard(_chalk);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireWildcard(_mongoose);

var _User = require('./usergroups.js');

var _User2 = _interopRequireWildcard(_User);

exports['default'] = {
  connect_database: connect_database,
  importUsergroups: importUsergroups,
  exportUsergroups: exportUsergroups
};

/**
 * Connect to MongoDB Database.
 *
 * @param {String} db
 */

function connect_database() {
  var db = arguments[0] === undefined ? 'mongodb://localhost:27017/ps' : arguments[0];

  var url = process.env.MONGODB || db;
  _mongoose2['default'].connect(url);
  _mongoose2['default'].connection.on('error', function () {
    return console.error(_chalk2['default'].red('MongoDB Connection Error. Make sure MongoDB is running.'));
  });
}

/**
 * Get usergroups from MongoDB.
 *
 * @param {Object} usergroups
 * @param {Object} Config
 */

function importUsergroups(usergroups, Config) {
  _User2['default'].find({}, function (err, users) {
    if (err) return;
    users.forEach(function (user) {
      return usergroups[toId(user.name)] = (user.group || Config.groupsranking[0]) + user.name;
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
      name: usergroups[i].substr(1).replace(/,/g, ''),
      group: usergroups[i].substr(0, 1)
    });
  }
  users.forEach(function (user) {
    _User2['default'].findOne({ name: user.name.toLowerCase() }, function (err, userModel) {
      if (err) return;
      if (!userModel) {
        user = new _User2['default']({
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
  _User2['default'].find({}, function (err, usersModel) {
    if (err) return;
    usersModel.forEach(function (user) {
      if (users.indexOf(user.name) >= 0) return;
      _User2['default'].findOne({ name: user.name }, function (err, user) {
        if (err) return;
        user.group = '';
        user.save();
      });
    });
  });
}
module.exports = exports['default'];