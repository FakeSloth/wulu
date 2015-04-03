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
    },

    endpoll(target, room, user) {
      if (!this.can('broadcast')) return;
      if (!Poll[room.id].question) return this.sendReply('There is no poll to end in this room.');

      let roomPoll = Poll[room.id];
      let votes = Object.keys(roomPoll.options).length;

      if (votes === 0) {
        Poll.reset(room.id);
        return room.add('|raw|<h3>The poll was canceled because of lack of voters.</h3>');
      }

      let results = Poll.end(roomPoll, votes);

      room.addRaw(`<div class="infobox">
                     <h2>Results to ${roomPoll.question}</h2>
                     <font size="1" color="#aaaaaa"><b>Poll ended by <i>${user.name}</i></font>
                     <br><hr>${results}</b>
                   </div>`.replace(/(\r\n|\n|\r)/gm, ''));
      Poll.reset(room.id);
    },

    vote(target, room, user) {
      if (!Poll[room.id].question) return this.sendReply('There is no poll currently going on in this room.');
      if (!this.canTalk()) return;
      if (!target) return this.parse('/help vote');

      let roomPoll = Poll[room.id];
      if (roomPoll.optionList.indexOf(target.toLowerCase()) === -1) {
        return this.sendReply(`'${target}' is not an option for the current poll.`);
      }

      let ips = JSON.stringify(user.ips);
      roomPoll.options[ips] = target.toLowerCase();

      this.sendReply(`You are not voting for ${target}.`);
    },

    votes(target, room) {
      if (!this.canBroadcast()) return;
      this.sendReply(`NUMBER OF VOTES: ${Object.keys(Poll[room.id].options).length}`);
    },

    pr: 'pollremind',
    pollremind: function (target, room) {
      if (!Poll[room.id].question) return this.sendReply('There is no poll currently going on in this room.');
      if (!this.canBroadcast()) return;
      this.sendReplyBox(Poll[room.id].display);
    },

    tierpoll() {
      if (!this.can('broadcast')) return;
      let tiers = Object.keys(Tools.data.Formats).filter((format) => Tools.data.Formats[format].effectType === 'Format').join(',');
      this.parse(`/poll Tournament tier?, ${tiers}`);
    }
  };

  Object.merge(CommandParser.commands, commands);
}
