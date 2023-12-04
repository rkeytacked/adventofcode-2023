#!/usr/bin/env node
const {log, readLines, split, sum} = require("./common");

/* * * * * * * *
 * * DAY  04 * *
 * * * * * * * */

let cards = readLines('../inputs/04.txt', split(/\s*[|:]\s+/))
    .map(([, wins, yours]) => [wins.split(/\s+/), yours.split(/\s+/)]);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const matches = cards.map(([wins, yours]) => yours.filter(num => wins.includes(num)).length);

const points = matches.map(count => count && Math.pow(2, count - 1));

log('solution #1: ', sum(points));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const numbersOfCards = Array(cards.length).fill(1);

matches.forEach((count, i) => {
    for (let j = 1; j <= count; j++) {
        numbersOfCards[i + j] += numbersOfCards[i];
    }
});

log('solution #2: ', sum(numbersOfCards));
