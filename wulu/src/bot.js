export default class Bot {
  /**
   * Bot constructor
   *
   * @param {String} name
   * @param {Number|String} avatar
   * @param {Char} group
   * @param {Array} rooms
   */

  constructor(name='Booty-Bot', avatar=1, group='@', rooms=['global', 'lobby']) {
    this.name = name;
    this.avatar = avatar;
    this.group = group;
    this.rooms = rooms;
  }

  /**
   * Create a new user that is the bot
   * and join the global room.
   *
   * @param {String} ip
   * @return {Object} user
   */

  connect(ip='127.0.0.1') {
    let connection = this.createConnection(ip);
    let user = new Users.User(connection);
    connection.user = user;
    this.setup(user, connection);

    return user;
  }

  /**
   * Create a connection
   *
   * @param {String} ip
   * @param {Number} workerid
   * @param {Number} socketid
   * @return {Object} connection
   */

  createConnection(ip='127.0.0.1', workerid, socketid=1) {
    if (!workerid) {
      workerid = Object.keys(Sockets.workers)[0];
      while (Users.connections[workerid + '-' + socketid]) {
        socketid++;
      }
    }
    let connectionid = `${workerid} - ${socketid}`;
    let connection = Users.connections[connectionid] = new Users.Connection(connectionid, Sockets.workers[workerid], socketid, null, ip);
    return connection;
  }

  /**
   * Setup the Bot user's properties.
   *
   * @param {Object} user
   * @param {Object} connection
   */

  setup(user, connection) {
    user.name = this.name;
    user.named = true;
    user.userid = toId(this.name);
    user.avatar = this.avatar;
    user.group = this.group;
    user.authenticated = true;
    user.isStaff = true;

    this.rooms.forEach((room) => user.joinRoom(room, connection));

    Users.users[user.userid] = user;
  }
}
