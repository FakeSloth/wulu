export default poll;

function poll() {
  let commands = {
    poll(target, room, user) {
      if (!this.can('broadcast')) return;
      if (Poll[room.id].question) return this.sendReply('There is currently a poll going on already in this room.');
      if (!this.canTalk()) return;

      let options = Poll.splint(target);
      if (options.length < 3) return this.parse('/help poll');

      Poll.create(options, Poll[room.id], user);

      room.add(`|raw|<div class="infobox">${Poll[room.id].display}</div>`);
    }
  };

  Object.merge(CommandParser.commands, commands);
}
