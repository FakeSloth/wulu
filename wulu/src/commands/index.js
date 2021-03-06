import away from './away';
import clearall from './clearall';
import define from './define';
import emoticons from './emoticons';
import help from './help';
import hide from './hide';
import money from './money';
import pmall from './pmall';
import poof from './poof';
import poll from './poll';
import regdate from './regdate';
import reload from './reload';
import seen from './seen';
import shop from './shop';
import stafflist from './stafflist';
import wulu from './wulu';

let commands = {
  away,
  clearall,
  define,
  emoticons,
  help,
  hide,
  money,
  pmall,
  poof,
  poll,
  regdate,
  reload,
  seen,
  shop,
  stafflist,
  wulu
};

commands.init = () => {
  Object.each(commands, (command) => {
    if (command === 'init') return;
    commands[command]();
  });
};

export default commands;
