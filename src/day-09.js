#!/usr/bin/env node
const {log, readLines, split, sum, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  09 * *
 * * * * * * * */

let lines = readLines('../inputs/09.txt', split(' ', toNumber));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function predict(sequence) {
    if (sequence.length === 1) {
        return sequence[0];
    }
    let diffs = [];
    for (let i = 1; i < sequence.length; i++) {
        diffs.push(sequence[i] - sequence[i - 1]);
    }
    return sequence[sequence.length - 1] + predict(diffs);
}

log('solution #1: ', sum(lines.map(predict)));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

lines.forEach(x => x.reverse());

log('solution #2: ', sum(lines.map(predict)));
