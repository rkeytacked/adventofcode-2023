#!/usr/bin/env node
const {log, max, readLines, split, sum, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  02 * *
 * * * * * * * */

let games = readLines('../inputs/02.txt', split(/[:;] /g)).reduce((result, [game, ...takes]) => Object.assign(result, {
    [game.split(' ')[1]]: takes.map(take => take.split(/, /g).map(col => col.split(' ')).reduce((obj, [num, c]) => Object.assign(obj, {[c]: Number(num)}), {}))
}), {});


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const maxRed = 12
const maxGreen = 13
const maxBlue = 14;

const possibleIds = Object.keys(games).filter(key =>
    games[key].every(({red = 0, green = 0, blue = 0}) => red <= maxRed && green <= maxGreen && blue <= maxBlue)
);

log('solution #1: ', sum(possibleIds.map(toNumber)));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const powers = Object.values(games).map(game =>
    max(game.map(({red = 0}) => red)) *
    max(game.map(({green = 0}) => green)) *
    max(game.map(({blue = 0}) => blue))
);

log('solution #2: ', sum(powers));
