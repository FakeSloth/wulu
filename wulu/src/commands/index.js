import away from './away';
import emoticons from './emoticons';
import help from './help';
import money from './money';
import poof from './poof';
import poll from './poll';
import reload from './reload';
import shop from './shop';

let commands = {
  away,
  emoticons,
  help,
  money,
  poof,
  poll,
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
