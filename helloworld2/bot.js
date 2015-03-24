/**
 * Internal Bot
 */

module.exports = {

  /**
   * Joining the server
   *
   * @param {Object} Config
   * @param {Object} Users
   * @param {Object} Rooms
   * @param {Function} toId
   */

  joinServer: function(Config, Users, Rooms, toId) {
    var worker = cluster.fork({PSPORT: Config.port, PSBINDADDR: Config.bindaddress || ''});

    /**
     * Connecting bot to server
     *
     * @param {Object} worker
     * @param {Undefined} workerid
     * @param {Number} socketid
     * @param {String} ip
     */
    Users.socketConnect(worker.server, undefined, '1', ip);

    var users = Users.users;
    var rooms = Rooms.rooms;
    var len = Object.keys(users);
    var rlen = Object.keys(rooms);

    while(len--) {
      if (!users[len].connections[0].ip !== ip) continue;

      var bot = users[len];

      bot.name = name;
      bot.named = true;
      bot.renamePending = name;
      bot.authenticated = true;
      bot.userid = toId(name);
      bot.group = group;

      for (var room in rooms) {
        if (room === 'global') continue;
        bot.roomCount[room] = 1;
      }
      users[bot.userid] = bot;
      for (var room in rooms) {
        if (room === 'global') continue;
        rooms[room].users[bot.userid] = users[bot.userid];
      }
      delete users[len];
    }
  }
};
