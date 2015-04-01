export default away;

/**
 * Sets user away or back.
 *
 * @param {String} message
 */

function away(message='\u0410\u051d\u0430\u0443') {
  if (!Users.User.prototype.getOriginalIdentity) {
    Users.User.prototype.getOriginalIdentity = Users.User.prototype.getIdentity;
  }

  Users.User.prototype.getIdentity = function(roomid) {
    var name = this.getOriginalIdentity(roomid);
    if (this.isAway) {
      name += ' - ' + message;
    }
    return name;
  };

  let back = 'away', idle = 'away';

  let commands = {
    back,
    idle,
    away(target, room, user) {
      user.isAway = !user.isAway;
      user.updateIdentity();
      this.sendReply(`You are ${user.isAway ? 'now' : 'no longer'} away.`);
    }
  };

  Object.merge(CommandParser.commands, commands);
}
