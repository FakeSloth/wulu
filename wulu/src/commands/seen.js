import User from '../user';
import moment from 'moment';

export default seen;

function seen() {
  let commands = {
    seen(target, room) {
      if (!this.canBroadcast()) return;
      if (!target) return this.sendReply('/seen [username] - Shows when the user last connected on the server.');
      let user = Users.get(target);
      if (user && user.connected) return this.sendReplyBox(`${target} is <b>currently online</b>.`);
      let self = this;
      User.findOne({ name: toId(target) }, function(err, user) {
        if (err) return;
        if (!user || !user.seen) {
          self.sendReplyBox(`${target} has never been online on this server.`);
          return room.update();
        }
        self.sendReplyBox(`${target} was last seen <b>${moment(user.seen).fromNow()}</b>.`);
        room.update();
      });
    }
  };

  Object.merge(CommandParser.commands, commands);
}
