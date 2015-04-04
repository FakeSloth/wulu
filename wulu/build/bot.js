'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var Bot = (function () {
  /**
   * Bot constructor
   *
   * @param {String} name
   * @param {Number|String} avatar
   * @param {Char} group
   * @param {Array} rooms
   */

  function Bot() {
    var name = arguments[0] === undefined ? 'Booty-Bot' : arguments[0];
    var avatar = arguments[1] === undefined ? 1 : arguments[1];
    var group = arguments[2] === undefined ? '@' : arguments[2];
    var rooms = arguments[3] === undefined ? ['global', 'lobby'] : arguments[3];

    _classCallCheck(this, Bot);

    this.name = name;
    this.avatar = avatar;
    this.group = group;
    this.rooms = rooms;
  }

  _createClass(Bot, [{
    key: 'connect',

    /**
     * Create a new user that is the bot
     * and join the global room.
     *
     * @return {Object} user
     */

    value: function connect() {
      var connection = this.createConnection();
      var user = new Users.User(connection);
      connection.user = user;
      this.setup(user, connection);

      return user;
    }
  }, {
    key: 'createConnection',

    /**
     * Create a connection
     *
     * @param {String} ip
     * @param {Number} workerid
     * @param {Number} socketid
     * @return {Object} connection
     */

    value: function createConnection(_x5, workerid) {
      var ip = arguments[0] === undefined ? '127.0.0.1' : arguments[0];
      var socketid = arguments[2] === undefined ? 1 : arguments[2];

      if (!workerid) {
        workerid = Object.keys(Sockets.workers)[0];
        while (Users.connections[workerid + '-' + socketid]) {
          socketid++;
        }
      }
      var connectionid = '' + workerid + ' - ' + socketid;
      var connection = Users.connections[connectionid] = new Users.Connection(connectionid, Sockets.workers[workerid], socketid, null, ip);
      return connection;
    }
  }, {
    key: 'setup',

    /**
     * Setup the Bot user's properties.
     *
     * @param {Object} user
     * @param {Object} connection
     */

    value: function setup(user, connection) {
      user.name = this.name;
      user.named = true;
      user.userid = toId(this.name);
      user.avatar = this.avatar;
      user.group = this.group;
      user.authenticated = true;
      user.isStaff = true;

      this.rooms.forEach(function (room) {
        return user.joinRoom(room, connection);
      });

      Users.users[user.userid] = user;
    }
  }]);

  return Bot;
})();

exports['default'] = Bot;
module.exports = exports['default'];