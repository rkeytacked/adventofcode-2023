#!/usr/bin/env node
const {log, min, readLines, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  05 * *
 * * * * * * * */

let lines = readLines('../inputs/05.txt');

const seeds = lines.shift().split(/:\s*/)[1].split(/\s+/).map(toNumber);

const maps = [];
for (let tmp = [], line; lines.length;) {
    if (!(line = lines.shift())) {
        continue;
    }
    if (line.endsWith(':')) {
        maps.push(tmp = []);
    } else {
        let [dst, src, len] = line.split(/\s+/g).map(toNumber);
        tmp.push({from: src, to: src + len, diff: dst - src});
    }
}
for (let m of maps) {
    m.sort(({from: x}, {to: y}) => x - y);
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function mapNumber(num, mapping) {
    for (let {from, to, diff} of mapping) {
        if (num >= from && num < to) {
            return num + diff;
        }
    }
    return num;
}

const mappedNumbers = maps.reduce((current, mapping) => current.map(num => mapNumber(num, mapping)), seeds);
log('solution #1: ', min(mappedNumbers));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const seedRanges = [...Array(seeds.length / 2)].map((_, i) => [seeds[i * 2], seeds[i * 2] + seeds[i * 2 + 1]]);

function mapRange([start, end], mapping) {
    let pieces = [];
    for (const {from, to, diff} of mapping) {
        let cutStart = Math.max(start, from);
        let cutEnd = Math.min(end, to);
        if (cutEnd > cutStart) {
            pieces.push([cutStart + diff, cutEnd + diff]);
            (cutStart > start) && pieces.push([start, cutStart]);
            start = cutEnd;
        }
    }
    (end > start) && pieces.push([start, end]);
    return pieces;
}

const mappedRanges = maps.reduce((current, mapping) => current.flatMap(range => mapRange(range, mapping)), seedRanges);
log('solution #2: ', min(mappedRanges.map(([from]) => from)));
