import away from './commands/away';
import poof from './commands/poof';
import money from './commands/money';

export default {
  init() {
    away();
    poof();
    money();
  },
  away,
  poof,
  money
};
