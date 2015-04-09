import away from './away';
import clearall from './clearall';
import define from './define';
import emoticons from './emoticons';
import money from './money';
import pmall from './pmall';
import poof from './poof';
import poll from './poll';
import regdate from './regdate';
import reload from './reload';
import shop from './shop';
import wulu from './wulu';

let commands = {
  away,
  clearall,
  define,
  emoticons,
  money,
  pmall,
  poof,
  poll,
  regdate,
  reload,
  shop,
  wulu
};

commands.init = () => {
  Object.each(commands, (command) => {
    if (command === 'init') return;
    commands[command]();
  });
};

export default commands;
