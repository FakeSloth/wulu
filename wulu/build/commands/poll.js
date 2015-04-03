'use strict';

module.exports = poll;

function poll() {
  var commands = {
    poll: function poll(target, room, user) {
      if (!this.can('broadcast')) {
        return;
      }if (Poll[room.id].question) {
        return this.sendReply('There is currently a poll going on already in this room.');
      }if (!this.canTalk()) {
        return;
      }var options = Poll.splint(target);
      if (options.length < 3) {
        return this.parse('/help poll');
      }Poll.create(options, Poll[room.id], user);

      room.add('|raw|<div class="infobox">' + Poll[room.id].display + '</div>');
    }
  };

  Object.merge(CommandParser.commands, commands);
}