import mongoose from 'mongoose';


let userSchema = new mongoose.Schema({
  name: { type: String, lowercase: true },
  group: String
});

let User = mongoose.model('user', userSchema);
export default {
  connect_database,
  importUsergroups,
  exportUsergroups,
  User
};

function connect_database() {
  let url = process.env.MONGODB || 'mongodb://localhost:27017/ps';
  mongoose.connect(url);
  mongoose.connection.on('error', () => console.error('MongoDB Connection Error. Make sure MongoDB is running.') );
};

function importUsergroups(usergroups, Config) {
  User.find({}, (err, users) => {
    if (err) return;
    users.forEach((user) => usergroups[user.name] =  (user.group || Config.groupsranking[0]) + user.name );
  });
};

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
};
