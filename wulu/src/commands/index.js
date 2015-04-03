import away from './away';
import emoticons from './emoticons';
import money from './money';
import poof from './poof';
import poll from './poll';
import shop from './shop';

let commands = {
  away,
  emoticons,
  money,
  poof,
  poll,
  shop
};

commands.init = () => {
  Object.each(commands, (command) => {
    if (command === 'init') return;
    commands[command]();
  });
};

export default commands;
