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
    },

    endpoll: function endpoll(target, room, user) {
      if (!this.can('broadcast')) {
        return;
      }if (!Poll[room.id].question) {
        return this.sendReply('There is no poll to end in this room.');
      }var roomPoll = Poll[room.id];
      var votes = Object.keys(roomPoll.options).length;

      if (votes === 0) {
        Poll.reset(room.id);
        return room.add('|raw|<h3>The poll was canceled because of lack of voters.</h3>');
      }

      var results = Poll.end(roomPoll, votes);

      room.addRaw(('<div class="infobox">\n                     <h2>Results to ' + roomPoll.question + '</h2>\n                     <font size="1" color="#aaaaaa"><b>Poll ended by <i>' + user.name + '</i></font>\n                     <br><hr>' + results + '</b>\n                   </div>').replace(/(\r\n|\n|\r)/gm, ''));
      Poll.reset(room.id);
    },

    vote: function vote(target, room, user) {
      if (!Poll[room.id].question) {
        return this.sendReply('There is no poll currently going on in this room.');
      }if (!this.canTalk()) {
        return;
      }if (!target) {
        return this.parse('/help vote');
      }var roomPoll = Poll[room.id];
      if (roomPoll.optionList.indexOf(target.toLowerCase()) === -1) {
        return this.sendReply('\'' + target + '\' is not an option for the current poll.');
      }

      var ips = JSON.stringify(user.ips);
      roomPoll.options[ips] = target.toLowerCase();

      this.sendReply('You are not voting for ' + target + '.');
    },

    votes: function votes(target, room) {
      if (!this.canBroadcast()) {
        return;
      }this.sendReply('NUMBER OF VOTES: ' + Object.keys(Poll[room.id].options).length);
    },

    pr: 'pollremind',
    pollremind: function pollremind(target, room) {
      if (!Poll[room.id].question) {
        return this.sendReply('There is no poll currently going on in this room.');
      }if (!this.canBroadcast()) {
        return;
      }this.sendReplyBox(Poll[room.id].display);
    },

    tierpoll: function tierpoll() {
      if (!this.can('broadcast')) {
        return;
      }var tiers = Object.keys(Tools.data.Formats).filter(function (format) {
        return Tools.data.Formats[format].effectType === 'Format';
      }).join(',');
      this.parse('/poll Tournament tier?, ' + tiers);
    }
  };

  Object.merge(CommandParser.commands, commands);
}