import away from './away';
import emoticons from './emoticons';
import money from './money';
import poof from './poof';
import shop from './shop';

let commands = {
  away,
  emoticons,
  money,
  poof,
  shop
};

commands.init = () => {
  let len = commands.length;
  while(len--) {
    commands[len]();
  }
};

export default commands;
