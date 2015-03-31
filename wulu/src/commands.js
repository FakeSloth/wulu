import away from './commands/away';
import emoticons from './commands/emoticons';
import money from './commands/money';
import poof from './commands/poof';
import shop from './commands/shop';

export default {
  init() {
    away();
    emoticons();
    money();
    poof();
    shop();
  },
  away,
  emoticons,
  money,
  poof,
  shop
};
