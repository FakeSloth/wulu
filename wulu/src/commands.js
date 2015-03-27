import away from './commands/away';
import poof from './commands/poof';

export default {
  init() {
    away();
    poof();
  },
  away,
  poof
};
