#!/usr/bin/env node
const {log, range, readLines, split, sum} = require("./common");

/* * * * * * * *
 * * DAY  15 * *
 * * * * * * * */

let lines = readLines('../inputs/15.txt', x => x, ',');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function hash(w) {
    return w.split('').reduce((acc, curr) => ((acc + curr.charCodeAt(0)) * 17) % 256, 0);
}

log('solution #1: ', sum(lines.map(hash)));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const boxes = range(256).map(() => []);
for (const [label, op] of lines.map(split(/[=-]/))) {
    let i = hash(label);
    let pos = boxes[i].findIndex(([x]) => x === label);
    if (!op) {
        boxes[i].splice(pos, pos >= 0 ? 1 : 0);
    } else {
        boxes[i][pos >= 0 ? pos : boxes[i].length] = [label, op];
    }
}

let total = sum(boxes.map((b, i) => (i + 1) * sum(b.map(([, op], j) => (j + 1) * Number(op)))));
log('solution #2: ', total);
