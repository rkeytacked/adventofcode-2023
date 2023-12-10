#!/usr/bin/env node
const {log, readCharArrays, key} = require("./common");

/* * * * * * * *
 * * DAY  10 * *
 * * * * * * * */

let lines = readCharArrays('../inputs/10.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let Sy = lines.findIndex(line => line.includes('S'));
let Sx = lines[Sy].indexOf('S');

let maxY = lines.length - 1;
let maxX = lines[0].length - 1;

function findPipe(above, below, before, after) {
    return above ? after ? 'L' : before ? 'J' : '|' : below ? after ? 'F' : '7' : '-';
}

lines[Sy][Sx] = findPipe(
    Sy > 0 && ['7', '|', 'F'].includes(lines[Sy - 1][Sx]),
    Sy < maxY && ['J', '|', 'L'].includes(lines[Sy + 1][Sx]),
    Sx > 0 && ['L', '-', 'F'].includes(lines[Sy][Sx - 1]),
    Sx < maxX && ['7', '-', 'J'].includes(lines[Sy][Sx + 1])
);

function walk(y, x) {
    let visited = new Set();
    while (true) {
        visited.add(key(y, x));
        if (y > 0 && ['J', '|', 'L'].includes(lines[y][x]) && !visited.has(key(y - 1, x))) {
            y--;
        } else if (y < maxY && ['7', '|', 'F'].includes(lines[y][x]) && !visited.has(key(y + 1, x))) {
            y++;
        } else if (x > 0 && ['J', '-', '7'].includes(lines[y][x]) && !visited.has(key(y, x - 1))) {
            x--;
        } else if (x < maxX && ['L', '-', 'F'].includes(lines[y][x]) && !visited.has(key(y, x + 1))) {
            x++;
        } else {
            return visited;
        }
    }
}

const path = walk(Sy, Sx);
log('solution #1: ', 'half path length', path.size / 2);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */


let countInside = 0;
for (let y = 0, inside = false; y < lines.length; y++){
    [...(lines[y])].forEach((ch, x) => {
        if (path.has(key(y, x))) {
            if (inside === 'above') {
                inside = ch === 'J' ? false : ch === '7' ? true : 'above';
            } else if (inside === 'below') {
                inside = ch === 'J' ? true : ch === '7' ? false : 'below';
            } else if (inside === true) {
                inside = ch === 'F' ? 'above' : ch === 'L' ? 'below' : false;
            } else {
                inside = ch === 'F' ? 'below' : ch === 'L' ? 'above' : true;
            }
        } else if (inside) {
            countInside++;
        }
    });
}

log('solution #2: ', 'inside tiles', countInside);
