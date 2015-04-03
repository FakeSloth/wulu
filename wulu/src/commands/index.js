import away from './away';
import emoticons from './emoticons';
import money from './money';
import poof from './poof';
import shop from './shop';

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
