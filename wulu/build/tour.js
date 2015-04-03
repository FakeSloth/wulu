'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

var _Economy = require('./economy');

var Economy = _interopRequire(_Economy);

module.exports = tour;

/**
 * Gets the name of users
 *
 * @param {Array} users
 * @return {String} name
 */

function usersToNames(users) {
  return users.map(function (user) {
    return user.name;
  });
}

/**
 * Determines the amount of earnings from tournaments
 *
 * @param {Number} sizeRequiredToEarn
 * @param {Color} color (color for annoucements of tournament winner and runnerUp if runnerUp exists)
 */

function tour() {
  var sizeRequiredToEarn = arguments[0] === undefined ? 3 : arguments[0];
  var color = arguments[1] === undefined ? 'blue' : arguments[1];

  var Tournament = Tournaments.Tournament;

  if (!Tournament.prototype.onOriginalTournamentEnd) {
    Tournament.prototype.onOriginalTournamentEnd = Tournament.prototype.onTournamentEnd;
  }

  Tournament.prototype.onTournamentEnd = function () {
    this.onOriginalTournamentEnd();

    var data = this.generator.getResults().map(usersToNames).toString();
    var winner = undefined,
        runnerUp = undefined;

    if (data.indexOf(',') >= 0) {
      data = data.split(',');
      winner = data[0];
      if (data[1]) {
        runnerUp = data[1];
      }
    } else {
      winner = data;
    }

    var wid = toId(winner);
    var rid = toId(runnerUp);
    var tourSize = this.generator.users.size;
    var currency_name = Economy.currency_name;

    if (this.room.isOfficial && tourSize >= sizeRequiredToEarn) {
      var firstMoney = Math.round(tourSize);
      var secondMoney = Math.round(firstMoney / 2);
      var firstCurrencyName = firstMoney >= 2 ? currency_name + 's' : currency_name;
      var secondCurrencyName = secondMoney >= 2 ? currency_name + 's' : currency_name;

      // annouces the winner and runnerUp if runnerUp exists
      this.room.add('|raw|<b><font color="' + color + '">' + Tools.escapeHTML(winner) + '</font> has won <font color="' + color + '">' + firstMoney + '</font> ' + firstCurrencyName + ' for winning the tournament!</b>');
      if (runnerUp) this.room.add('|raw|<b><font color="' + color + '">' + Tools.escapeHTML(runnerUp) + '</font> has also won <font color="' + color + '">' + secondMoney + '</font> ' + secondCurrencyName + ' for being getting runner up of the tournament!</b>');

      Economy.give(wid, firstMoney);
      Economy.give(rid, secondMoney);
    }
  };
}