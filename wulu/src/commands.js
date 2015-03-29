import away from './commands/away';
import emoticons from './commands/emoticons';
import money from './commands/money';
import poof from './commands/poof';

export default {
  init() {
    away();
    emoticons();
    money();
    poof();
  },
  away,
  emoticons,
  money,
  poof
};
