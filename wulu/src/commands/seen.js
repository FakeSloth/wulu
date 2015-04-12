import User from '../user';
import moment from 'moment';

export default seen;

function seen() {
  let commands = {
    seen(target, room, user) {
      if (!this.canBroadcast()) return;
      if (!target) return this.sendReply('/seen [username] - Shows when the user last connected on the server.');
      this.splitTarget(target);
      if (this.targetUser) return this.sendReplyBox(`${this.targetUsername} is <b>currently online</b>.`);
      let self = this;
      User.findOne({ name: toId(target) }, function(err, user) {
        if (err) return;
        if (!user || !user.seen) {
          self.sendReplyBox(`${self.targetUsername} has never been online on this server.`);
          return room.update();
        }
        self.sendReplyBox(`${self.targetUsername} was last seen <b>${moment(user.seen).fromNow()}</b>.`);
        room.update();
      });
    }
  };

  Object.merge(CommandParser.commands, commands);
}
