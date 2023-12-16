#!/usr/bin/env node
const {log, max, range, readCharArrays, key} = require("./common");

/* * * * * * * *
 * * DAY  16 * *
 * * * * * * * */

let lines = readCharArrays('../inputs/16.txt');
const {width, height} = lines;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function energize(start) {
    let energized = {};
    let toAnalyze = [start];
    const add = (x, y, dir) => (x >= 0 && x < height && y >= 0 && y < width) && toAnalyze.push([x, y, dir]);

    while (toAnalyze.length) {
        const [x, y, dir] = toAnalyze.shift();
        const k = key(x, y);
        energized[k] ||= {};
        if (!energized[k][dir]) {
            energized[k][dir] = true;
            switch (dir) {
                case 'r': {
                    switch (lines[y][x]) {
                        case '/':
                            add(x, y - 1, 'u');
                            break;
                        case '\\':
                            add(x, y + 1, 'd');
                            break
                        case '|':
                            add(x, y - 1, 'u');
                            add(x, y + 1, 'd');
                            break;
                        default:
                            add(x + 1, y, 'r');
                    }
                    break;
                }
                case 'l': {
                    switch (lines[y][x]) {
                        case '\\':
                            add(x, y - 1, 'u');
                            break;
                        case '/':
                            add(x, y + 1, 'd');
                            break
                        case '|':
                            add(x, y - 1, 'u');
                            add(x, y + 1, 'd');
                            break;
                        default:
                            add(x - 1, y, 'l');
                    }
                    break;
                }
                case 'd': {
                    switch (lines[y][x]) {
                        case '\\':
                            add(x + 1, y, 'r');
                            break;
                        case '/':
                            add(x - 1, y, 'l');
                            break
                        case '-':
                            add(x + 1, y, 'r');
                            add(x - 1, y, 'l');
                            break;
                        default:
                            add(x, y + 1, 'd');
                    }
                    break;
                }
                case 'u': {
                    switch (lines[y][x]) {
                        case '/':
                            add(x + 1, y, 'r');
                            break;
                        case '\\':
                            add(x - 1, y, 'l');
                            break
                        case '-':
                            add(x + 1, y, 'r');
                            add(x - 1, y, 'l');
                            break;
                        default:
                            add(x, y - 1, 'u');
                    }
                    break;
                }
            }
        }
    }
    return Object.keys(energized).length;
}

log('solution #1: ', energize([0, 0, 'r']));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let best = max([
    ...range(height).map(y => energize([0, y, 'r'])),
    ...range(height).map(y => energize([width - 1, y, 'l'])),
    ...range(width).map(x => energize([x, 0, 'd'])),
    ...range(width).map(x => energize([x, height - 1, 'u']))
]);

log('solution #2: ', best);
