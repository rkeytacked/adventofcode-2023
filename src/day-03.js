#!/usr/bin/env node
const {log, readLines, key, sum, prod, spanYX, unique} = require("./common");

/* * * * * * * *
 * * DAY  03 * *
 * * * * * * * */

let lines = readLines('../inputs/03.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let numbers = {};
lines.forEach((line, y) => {
    [...line].forEach((chr, x) => {
        if (/[0-9]/.test(chr)) {
            let num = numbers[key(y, x)] = numbers[key(y, x - 1)] || {value: 0};
            num.value = num.value * 10 + Number(chr);
        }
    });
});

const parts = unique(lines.flatMap((line, y) =>
    [...line].flatMap((chr, x) =>
        /[0-9.]/.test(chr) ? [] : spanYX(y, x)
    )
).map(k => numbers[key(k)]));

const partNumbers = [...parts].map(({value}) => value);

log('solution #1: ', partNumbers.length, 'parts of sum: ', sum(partNumbers));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const gears = lines.flatMap((line, y) =>
    [...line].map((chr, x) => (chr === '*') &&
        unique(spanYX(y, x).map(k => numbers[key(k)])).map(({value}) => value)
    )
).filter(l => l?.length === 2);

log('solution #2: ', gears.length, 'gears of ratio sum: ', sum(gears.map(prod)));
