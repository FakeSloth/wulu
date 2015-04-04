import http from 'http';

export default regdate;

function regdate() {
  let commands = {
    regdate(target, room) {
      if (!this.canBroadcast()) return;
      if (!target || target === '.' || target === ',' || target === '\'') {
        return this.sendReply('/regdate [user] - Shows registration date of the user.');
      }
      let username = Tools.escapeHTML(target);
      target = target.replace(/\s+/g, '');

      let options = {
        host: 'www.pokemonshowdown.com',
        port: 80,
        path: '/forum/~' + target
      };

      let content = '';
      let data = '';
      let self = this;
      let req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => content += chunk);
        res.on('end', () => {
          content = content.split('<em');
          if (content[1]) {
            content = content[1].split('</p>');
            if (content[0]) {
              content = content[0].split('</em>');
              if (content[1]) {
                let regdate = content[1].trim();
                data = `${username} was registered on ${regdate}.`;
              }
            }
          } else {
            data = `${username} is not registered.`;
          }
          self.sendReplyBox(data);
          room.update();
        });
      });
      req.end();
    }
  };

  Object.merge(CommandParser.commands, commands);
}
