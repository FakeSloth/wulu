var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: { type: String, lowercase: true },
  group: String
});

var User = exports.User = mongoose.model('user', userSchema);

exports.connect_database = function() {
  var url = process.env.MONGODB || 'mongodb://localhost:27017/ps';
  mongoose.connect(url);
  mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
  });
};

exports.importUsergroups = function(usergroups, Config) {
  User.find({}, function(err, users) {
    if (err) return; 
    users.forEach(function(user) {
      usergroups[user.name] =  (user.group || Config.groupsranking[0]) + user.name;
    });
  });
};

exports.exportUsergroups = function(usergroups) {
  var users = [];
  for (var i in usergroups) {
    users.push({
      name: usergroups[i].substr(1).replace(/,/g, ''),
      group: usergroups[i].substr(0, 1)
    });
  }
  users.forEach(function(user) {
    User.findOne({ name: user.name.toLowerCase() }, function(err, userModel) {
      if (err) return; 
      if (!userModel) {
        user = new User({
          name: user.name,
          group: user.group
        });
        return user.save(function(err) {
          if (err) return err;
        });
      }
      userModel.group = user.group;
      userModel.save(function(err) {
        if (err) return;
      });
    });
  });
};
