export default shop;

let shop_data = [
  ['Symbol', 'Buys a custom symbol to go infront of name and puts you at top of userlist. (Temporary until restart, certain symbols are blocked)', 5],
  ['Fix', 'Buys the ability to alter your current custom avatar or trainer card. (don\'t buy if you have neither)', 10],
  ['Poof', 'Buy a poof message to be added into the pool of possible poofs.', 15],
  ['Who', 'Buys a custom whois bot message for your name.', 25],
  ['Avatar', 'Buys an custom avatar to be applied to your name (You supply. Images larger than 80x80 may not show correctly)', 30],
  ['Trainer', 'Buys a trainer card which shows information through a command.', 50],
  ['Room', 'Buys a chatroom for you to own. (within reason, can be refused)', 100]
];

let global_shop = getShopDisplay(shop_data);

/**
 * Shop where user can buy stuff with money.
 *
 * @param {Array} shop
 */
function shop() {
  let commands = {
    shop(target, room, user) {
      if (!this.canBroadcast()) return;
      return this.sendReply(`|raw|${global_shop}`); 
    }
  };
  Object.merge(CommandParser.commands, commands);
}

/**
 * Displays the shop
 *
 * @param {Array} shop
 * @return {String} display
 */
function getShopDisplay(shop) {
  let display = `<table border="1" cellspacing="0" cellpadding="5" width="100%">
            <tbody>
              <tr>
                <th>Command</th>
                <th>Description</th>
                <th>Cost</th>
            </tr>`.replace(/(\r\n|\n|\r)/gm, '');

  let start = 0, section;
  while (start < shop.length) {
    section = shop[start];
    display += `<tr>
            <td>${section[0]}</td>
            <td>${section[1]}</td>
            <td>${section[2]}</td>
          </tr>`.replace(/(\r\n|\n|\r)/gm, '');
    start++;
  }
  display += '</tbody></table><center>To buy an item from the shop, use /buy <em>command</em>.</center>';
  return display; 
}
