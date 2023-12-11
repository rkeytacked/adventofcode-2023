#!/usr/bin/env node
const {log, readCharArrays} = require("./common");

/* * * * * * * *
 * * DAY  11 * *
 * * * * * * * */

let lines = readCharArrays('../inputs/11.txt', c => c === '#');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const emptyRows = new Set(lines.map((_, y) => lines[y].every(v => !v) ? y : -1));
const emptyColumns = new Set(lines[0].map((_, x) => lines.every(line => !line[x]) ? x : -1));

let galaxies = lines.flatMap((line, y) => line.reduce((arr, val, x) => val ? [[x, y], ...arr] : arr, []))

function countDistances(expansion) {
    let dist = 0;
    for (let a of galaxies) {
        for (let b of galaxies) {
            let dX = 0;
            for (let from = Math.min(a[0], b[0]), to = Math.max(a[0], b[0]); from < to; from++) {
                dX += emptyColumns.has(from) ? expansion : 1;
            }
            let dY = 0;
            for (let from = Math.min(a[1], b[1]), to = Math.max(a[1], b[1]); from < to; from++) {
                dY += emptyRows.has(from) ? expansion : 1;
            }
            dist += dX + dY;
        }
    }
    return dist / 2;
}

log('solution #1: ', countDistances(2));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2', countDistances(1000000));
