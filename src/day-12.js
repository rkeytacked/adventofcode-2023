#!/usr/bin/env node
const {log, readLines, split, sum, toNumber, key} = require("./common");

/* * * * * * * *
 * * DAY  12 * *
 * * * * * * * */

let lines = readLines('../inputs/12.txt', split(/\s+/)).map(([txt, nrs]) => ({txt, nrs: nrs.split(',').map(toNumber)}));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function fits(txt, pos, len) {
    if (pos > 0 && txt[pos - 1] === '#') {
        return false;
    }
    if (txt[pos + len] === '#') {
        return false;
    }
    for (let i = 0; i < len; i++) {
        if (txt[pos + i] === '.') {
            return false;
        }
    }
    return true;
}

const cache = new Map();

function countPossibilities(txt, nrs, startTxt, startNr, minNeeded) {
    const cacheKey = key(arguments);
    if (!cache.has(cacheKey)) {
        if (startNr >= nrs.length) {
            cache.set(cacheKey, 1);
            for (let i = txt.length - 1; i >= startTxt; i--) {
                if (txt[i] === '#') {
                    cache.set(cacheKey, 0);
                    break;
                }
            }
        } else {
            let nr = nrs[startNr];
            let counter = 0;
            let startMax = txt.length - minNeeded;
            for (let i = startMax; i >= startTxt; i--) {
                if (txt[i] === '#') {
                    startMax = i;
                }
            }
            for (let i = startMax; i >= startTxt; i--) {
                if (fits(txt, i, nr)) {
                    counter += countPossibilities(txt, nrs, i + nr + 1, startNr + 1, minNeeded - nr - 1);
                }
            }
            cache.set(cacheKey, counter);
        }
    }
    return cache.get(cacheKey);
}

function count({txt, nrs}) {
    return countPossibilities(txt, nrs, 0, 0, sum(nrs) + nrs.length - 1);
}

log('solution #1: ', sum(lines.map(count)));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const enlarge = ({txt, nrs}) => ({
    txt: Array(5).fill(txt).join('?'),
    nrs: Array(5).fill(nrs).flatMap(x => x)
});

log('solution #2: ', sum(lines.map(enlarge).map(count)));
