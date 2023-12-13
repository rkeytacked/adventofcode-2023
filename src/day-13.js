#!/usr/bin/env node
const {log, range, readLines, sum} = require("./common");

/* * * * * * * *
 * * DAY  13 * *
 * * * * * * * */

let lines = readLines('../inputs/13.txt');

let note = [];
let notes = [note];
for (let line of lines) {
    if (line.length) {
        note.push(line)
    } else {
        notes.push(note = []);
    }
}

function flip(note) {
    return [...note[0]].map((_, i) => note.map(line => line[i]).join(''));
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findMirror(area) {

    function mirrors(Y) {
        for (let i = Y - 1, i2 = Y; i >= 0 && i2 < area.length; i--, i2++) {
            if (area[i] !== area[i2]) {
                return false;
            }
        }
        return true;
    }

    return range(area.length).slice(1).filter(mirrors);
}


function findMirrors(note) {
    return sum(findMirror(flip(note))) + 100 * sum(findMirror(note));
}

log('solution #1: ', sum(notes.map(findMirrors)));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function findSmudge(note) {
    const found = findMirror(note);

    return note.flatMap((line, y) =>
        [...line].flatMap((chr, x) =>
            findMirror([
                ...note.slice(0, y),
                line.substring(0, x) + (line[x] === '#' ? '.' : '#') + line.substring(x + 1),
                ...note.slice(y + 1)
            ]).filter(m => !found.includes(m))
        )
    );
}

function findSmudges(note) {
    return (sum(findSmudge(flip(note))) + 100 * sum(findSmudge(note))) / 2;
}

log('solution #2: ', sum(notes.map(findSmudges)));
