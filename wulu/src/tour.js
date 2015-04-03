import Economy from './economy';

export default tour;

let Tournament = Tournaments.Tournament;

/**
 * Gets the name of users
 *
 * @param {Array} users
 * @return {String} name
 */

function usersToNames(users) {
  return users.map((user) => user.name);
}

/**
 * Determines the amount of earnings from tournaments
 *
 * @param {Number} sizeRequiredToEarn
 * @param {Color} color (color for annoucements of tournament winner and runnerUp if runnerUp exists)
 */

function tour(sizeRequiredToEarn=3, color='blue') {
  if (!Tournament.prototype.onOriginalTournamentEnd) {
    Tournament.prototype.onOriginalTournamentEnd = Tournament.prototype.onTournamentEnd;
  }

  Tournament.prototype.onTournamentEnd = function() {
    this.onOriginalTournamentEnd();

    let data = this.generator.getResults().map(usersToNames).toString();
    let winner, runnerUp;

    if (data.indexOf(',') >= 0) {
      data = data.split(',');
      winner = data[0];
      if (data[1]) {
        runnerUp = data[1];
      }
    } else {
      winner = data;
    }

    let wid = toId(winner);
    let rid = toId(runnerUp);
    let tourSize = this.generator.users.size;
    let currency_name = Economy.currency_name;

    if (this.room.isOfficial && tourSize >= sizeRequiredToEarn) {
      let firstMoney = Math.round(tourSize);
      let secondMoney = Math.round(firstMoney / 2);
      let firstCurrencyName = firstMoney >= 2 ? currency_name + 's' : currency_name;
      let secondCurrencyName = secondMoney >= 2 ? currency_name + 's' : currency_name;

      // annouces the winner and runnerUp if runnerUp exists
      this.room.add(`|raw|<b><font color="${color}">${Tools.escapeHTML(winner)}</font> has won <font color="${color}">${firstMoney}</font> ${firstCurrencyName} for winning the tournament!</b>`);
      if (runnerUp) this.room.add(`|raw|<b><font color="${color}">${Tools.escapeHTML(runnerUp)}</font> has also won <font color="${color}">${secondMoney}</font> ${secondCurrencyName} for being getting runner up of the tournament!</b>`);

      Economy.give(wid, firstMoney);
      Economy.give(rid, secondMoney);
    }
  };
}
