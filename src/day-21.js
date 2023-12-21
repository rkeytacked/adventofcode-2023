#!/usr/bin/env node
const {log, range, readCharArrays, set, mod} = require("./common");

/* * * * * * * *
 * * DAY  21 * *
 * * * * * * * */

let lines = readCharArrays('../inputs/21.txt');
let width = lines.width;

let sY = lines.findIndex(line => line.includes('S'));
let sX = lines[sY].indexOf('S');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
const counts = [1]
const evenOddCounts = [0, 1]

let queue = set([sY, sX]);
let nextQueue = set();
let visited = set();

for (const step of range(3 * width)) {
    for (const [row, column] of queue) {
        visited.add([row, column]);
        for (const [dr, dc] of directions) {
            const y = row + dr;
            const x = column + dc;
            if (lines[mod(y, width)][mod(x, width)] !== '#' && !visited.has([y, x])) {
                nextQueue.add([y, x]);
            }
        }
    }
    queue = nextQueue;
    nextQueue = set();
    counts.push(evenOddCounts[step % 2] += queue.size);
}

function countTotalSteps(steps) {
    const a = counts[steps % width];
    const b = counts[steps % width + width];
    const c = counts[steps % width + 2 * width];
    const nrTiles = Math.floor(steps / width);
    return a + nrTiles * (b - a) + nrTiles * (nrTiles - 1) / 2 * (c - 2 * b + a)
}

log('solution #1: ', countTotalSteps(64));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2: ', countTotalSteps(26501365));
