import request from 'request';

export default define;

/**
 * Get definition of a word.
 */

function define() {
  let commands = {
    def: 'define',
    define: function (target, room) {
      if (!this.canBroadcast()) return;
      if (!target) return this.sendReply('/define [word] - Shows the definition of a word.');
      target = toId(target);
      if (target.length > 50) return this.sendReply('Word can not be longer than 50 characters.');

      let self = this;
      let options = {
        url: 'http://api.wordnik.com:80/v4/word.json/' + target + '/definitions?limit=3&sourceDictionaries=all' +
        '&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
      };

      function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
          let page = JSON.parse(body);
          let output = '<b>Definitions for ' + target + ':</b><br />';
          if (!page[0]) {
            self.sendReplyBox('No results for <b>"' + target + '"</b>.');
            return room.update();
          } else {
            let count = 1;
            for (let u in page) {
              if (count > 3) break;
              output += '(' + count + ') ' + page[u].text + '<br />';
              count++;
            }
            self.sendReplyBox(output);
            return room.update();
          }
        }
      }
      request(options, callback);
    },

    u: 'urbandefine',
    ud: 'urbandefine',
    urbandefine(target, room) {
      if (!this.canBroadcast()) return;
      if (!target) return this.sendReply('/urbandefine [word] - Finds the urban definition of the word.');
      if (target.length > 50) return this.sendReply('Phrase can not be longer than 50 characters.');

      let self = this;
      let options = {
        url: 'http://www.urbandictionary.com/iphone/search/define',
        term: target,
        headers: {
          'Referer': 'http://m.urbandictionary.com'
        },
        qs: {
          'term': target
        }
      };

      function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
          let page = JSON.parse(body);
          let definitions = page.list;
          if (page.result_type === 'no_results') {
            self.sendReplyBox('No results for <b>"' + Tools.escapeHTML(target) + '"</b>.');
            return room.update();
          } else {
            if (!definitions[0].word || !definitions[0].definition) {
              self.sendReplyBox('No results for <b>"' + Tools.escapeHTML(target) + '"</b>.');
              return room.update();
            }
            let output = '<b>' + Tools.escapeHTML(definitions[0].word) + ':</b> ' + Tools.escapeHTML(definitions[0].definition).replace(/\r\n/g, '<br />').replace(/\n/g, ' ');
            if (output.length > 400) output = output.slice(0, 400) + '...';
            self.sendReplyBox(output);
            return room.update();
          }
        }
      }
      request(options, callback);
    }
  };

  Object.merge(CommandParser.commands, commands);
}
