#!/usr/bin/env node
const {log, map, readLines, split, kgV} = require("./common");

/* * * * * * * *
 * * DAY  08 * *
 * * * * * * * */

let lines = readLines('../inputs/08.txt');

let instr = [...lines.shift()];
lines.shift();

const net = map(lines.map(split(/[\s=(,)]+/g)), ([n, l, r]) => [n, [l, r]]);


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function walk(p = 'AAA') {
    let steps = 0;
    for (let i = 0; p !== 'ZZZ'; i = (i + 1) % instr.length, steps++) {
        p = net[p][instr[i] === 'L' ? 0 : 1]
    }
    return steps;
}

log('solution #1: ', walk());

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function walkAll(p = 'AAA') {
    let steps = [];
    let count = 0;
    let last = 0;
    for (let i = 0; i < instr.length * 10000; i++) {
        if (p[2] === 'Z') {
            steps.push({place: p, steps: count, diff: count - last});
            last = count;
        }
        count++;
        p = net[p][instr[i % instr.length] === 'L' ? 0 : 1]
    }
    return steps;
}

let starts = Object.keys(net).filter(x => x[2] === 'A');
let camels = starts.map(walkAll);
let firstZs = camels.map(([{diff}]) => diff);
let loops = camels.map(([, {diff}]) => diff);

let pos = 0;
let totalLoop = 1;
for (let i = 0; i < loops.length; i++) {
    let rest = loops[i];
    while (pos < firstZs[i] || (pos - firstZs[i]) % rest !== 0) {
        pos += totalLoop;
    }
    totalLoop = kgV(totalLoop, rest);
}

log('solution #2: ', pos);
