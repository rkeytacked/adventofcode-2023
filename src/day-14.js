#!/usr/bin/env node
const {log, readCharArrays, sum} = require("./common");

/* * * * * * * *
 * * DAY  14 * *
 * * * * * * * */

let lines = readCharArrays('../inputs/14.txt');

const height = lines.length;
const width = lines[0].length;


/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function tiltNorth() {
    for (let y = 0; y < height; y++) {
        const line = lines[y];
        for (let x = 0; x < width; x++) {
            const stone = line[x];
            for (let i = y; i > 0 && stone === 'O' && lines[i - 1][x] === '.'; i--) {
                lines[i - 1][x] = stone;
                lines[i][x] = '.';
            }
        }
    }
}

function countSupport(lines) {
    return sum(lines.map(((line, y) => (height - y) * line.filter(x => x === 'O').length)));
}

tiltNorth();

log('solution #1: ', countSupport(lines));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function tiltSouth() {
    for (let y = height - 1; y >= 0; y--) {
        const line = lines[y];
        for (let x = 0; x < width; x++) {
            const stone = line[x];
            for (let i = y; i < height - 1 && stone === 'O' && lines[i + 1][x] === '.'; i++) {
                lines[i + 1][x] = stone;
                lines[i][x] = '.';
            }
        }
    }
}

function tiltWest() {
    for (let y = 0; y < height; y++) {
        const line = lines[y];
        for (let x = 0; x < width; x++) {
            const stone = line[x];
            for (let i = x; i > 0 && stone === 'O' && line[i - 1] === '.'; i--) {
                line[i - 1] = stone;
                line[i] = '.';
            }
        }
    }
}

function tiltEast() {
    for (let y = 0; y < height; y++) {
        const line = lines[y];
        for (let x = width - 1; x >= 0; x--) {
            const stone = line[x];
            for (let i = x; i < width - 1 && stone === 'O' && line[i + 1] === '.'; i++) {
                line[i + 1] = stone;
                line[i] = '.';
            }
        }
    }
}


tiltWest();
tiltSouth();
tiltEast();

const supports = [0];
const maxRounds = width + height;

for (let i = 1; i <= 2 * maxRounds; i++) {
    supports[i] = countSupport(lines);
    tiltNorth();
    tiltWest();
    tiltSouth();
    tiltEast();
}

const cycle = supports.lastIndexOf(supports[maxRounds]) - maxRounds;

log('solution #2: ', supports[maxRounds + (100000000000 - maxRounds) % cycle]);
