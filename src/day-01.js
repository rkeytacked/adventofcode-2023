#!/usr/bin/env node
const {
    log,
    associate,
    median,
    min,
    max,
    readCharArrays,
    readLines,
    readSingletonMaps,
    sort,
    split,
    sum,
    prod,
    toNumber
} = require("./common");

/* * * * * * * *
 * * DAY  01 * *
 * * * * * * * */

let lines = readLines('../inputs/01.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let values = lines.map(line => line.replaceAll(/[^0-9]/g, ''))
    .map(line => Number(line[0]) * 10 + Number(line[line.length - 1]));

log('solution #1: ', sum(values));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

values = lines.map(line => line
    .replaceAll(/one/g, 'one1one')
    .replaceAll(/two/g, 'two2two')
    .replaceAll(/three/g, 'three3three')
    .replaceAll(/four/g, 'four4four')
    .replaceAll(/five/g, 'five5five')
    .replaceAll(/six/g, 'six6six')
    .replaceAll(/seven/g, 'seven7seven')
    .replaceAll(/eight/g, 'eight8eight')
    .replaceAll(/nine/g, 'nine9nine')
    .replaceAll(/[^1-9]/g, '')
).map(x => Number(x[0]) * 10 + Number(x[x.length - 1]));

log('solution #2', sum(values));
