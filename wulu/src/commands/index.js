import away from './away';
import define from './define';
import emoticons from './emoticons';
import help from './help';
import money from './money';
import poof from './poof';
import poll from './poll';
import regdate from './regdate';
import reload from './reload';
import shop from './shop';

let commands = {
  away,
  define,
  emoticons,
  help,
  money,
  poof,
  poll,
  regdate,
  reload,
  shop
};

commands.init = () => {
  Object.each(commands, (command) => {
    if (command === 'init') return;
    commands[command]();
  });
};

export default commands;
