#!/usr/bin/env node
const {log, min, readCharArrays, toNumber, key} = require("./common");

/* * * * * * * *
 * * DAY  17 * *
 * * * * * * * */

let lines = readCharArrays('../inputs/17.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let lastPerc = 0;
let costs = new Map();
let toVisit = new Map();

function visit(target) {
    const [x, y, horiz, price] = target;
    let k = key(x, y, horiz);
    let prev = costs.get(k);
    if (prev && (prev <= price)) {
        return;
    }
    costs.set(k, price);
    toVisit.set(k, target);
    if (x === lines.width - 1 && y === lines.height - 1) {
        log('best ' + (horiz ? 'horizontal' : 'vertical') + ' =', price);
    }
}

function check(from, to) {
    costs.clear();
    toVisit.clear();
    toVisit.set(key(0, 0, false), [0, 0, false, 0]);
    toVisit.set(key(0, 0, true), [0, 0, true, 0]);

    while (toVisit.size) {
        let {value: [k, [x, y, horiz, price]]} = toVisit.entries().next();
        toVisit.delete(k);
        let perc = Math.floor((costs.size * 100) / (lines.width * lines.height * 4));
        if (perc !== lastPerc) {
            log(lastPerc = perc, '%')
        }
        if (horiz) {
            let p1 = price, p2 = price;
            for (let i = 1; i < from; i++) {
                if (x < lines.width - i) {
                    p1 += lines[y][x + i];
                }
                if (x >= i) {
                    p2 += lines[y][x - i];
                }
            }
            for (let i = from; i <= to; i++) {
                if (x < lines.width - i) {
                    p1 += lines[y][x + i];
                    visit([x + i, y, false, p1]);
                }
                if (x >= i) {
                    p2 += lines[y][x - i];
                    visit([x - i, y, false, p2]);
                }
            }
        } else {
            let p1 = price, p2 = price;
            for (let i = 1; i < from; i++) {
                if (y < lines.height - i) {
                    p1 += lines[y + i][x];
                }
                if (y >= i) {
                    p2 += lines[y - i][x];
                }
            }
            for (let i = from; i <= to; i++) {
                if (y < lines.height - i) {
                    p1 += lines[y + i][x];
                    visit([x, y + i, true, p1]);
                }
                if (y >= i) {
                    p2 += lines[y - i][x];
                    visit([x, y - i, true, p2]);
                }
            }
        }
    }
}

check(1, 3);

let res = [
    costs.get(key(lines.width - 1, lines.height - 1, true)),
    costs.get(key(lines.width - 1, lines.height - 1, false))
];

log('solution #1: ', 'best of', res, '=', min(res));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

check(4, 10);

res = [
    costs.get(key(lines.width - 1, lines.height - 1, true)),
    costs.get(key(lines.width - 1, lines.height - 1, false))
];

log('solution #2: ', 'best of', res, '=', min(res));
