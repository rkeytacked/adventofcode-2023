#!/usr/bin/env node
const {log, readLines, split, prod, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  06 * *
 * * * * * * * */

const [times, distances] = readLines('../inputs/06.txt', split(/\s+/))
    .map(([, ...numbers]) => numbers.map(toNumber));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const nullDistance = (t, d) => {
    const term = (t / 2) * (t / 2) - d;
    if (term <= 0) {
        return 0;
    }
    const root = Math.sqrt(term);
    const a = Math.floor(t / 2 - root + 1);
    const b = Math.ceil(t / 2 + root - 1);
    return b - a + 1;
}

const wins = times.map((time, i) => nullDistance(time, distances[i]));

log('solution #1: ', prod(wins));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let bigTime = Number(times.join(''));
let bigDistance = Number(distances.join(''));

log('solution #2: ', nullDistance(bigTime, bigDistance));
