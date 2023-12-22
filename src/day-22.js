#!/usr/bin/env node
const {log, readLines, split, sum, toNumber, key} = require("./common");

/* * * * * * * *
 * * DAY  22 * *
 * * * * * * * */

let lines = readLines('../inputs/22.txt', split(/[,~]/, toNumber))
    .sort(([, , zA], [, , zB]) => zA - zB);
const bricks = {};
lines.forEach(([x, y, z, ...to], name) =>
    bricks[name] = {from: [x, y, z], to, name: "" + name, supporters: new Set(), carries: new Set()}
);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */


const settled = {};

function settle({from: [x1, y1, z1], to: [x2, y2, z2], name, supporters, carries}) {
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            for (let z = z1; z <= z2; z++) {
                settled[key(x, y, z)] = name;
                let supporter = settled[key(x, y, z - 1)];
                if (supporter && supporter !== name) {
                    supporters.add(supporter);
                    bricks[supporter].carries.add(name);
                }
                let carrying = settled[key(x, y, z + 1)];
                if (carrying && carrying !== name) {
                    carries.add(carrying);
                    bricks[carrying].supporters.add(name);
                }
            }
        }
    }
}

function fall({from, to}) {
    const [x1, y1, z1] = from;
    const [x2, y2, z2] = to;
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            for (let z = z1; z <= z2; z++) {
                if (z === 1 || settled[key(x, y, z - 1)]) {
                    return false;
                }
            }
        }
    }
    from[2]--;
    to[2]--;
    return true;
}

let falling = [...Object.keys(bricks)];
while (falling.length) {
    const fallingNext = [];
    for (const i of falling) {
        if (fall(bricks[i])) {
            fallingNext.push(i);
        } else {
            settle(bricks[i]);
        }
    }
    falling = fallingNext;
}

let necessary = new Set();
for (const brick of Object.values(bricks)) {
    for (const carriyng of brick.carries) {
        if (bricks[carriyng].supporters.size === 1) {
            necessary.add(brick.name);
        }
    }
}

log('solution #1: ', lines.length - necessary.size);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function disintegrate({name}) {
    let gone = new Set([name]);
    let toCheck = [name];
    while (toCheck.length) {
        let check = toCheck.pop();
        for (const carriyng of bricks[check].carries) {
            if ([...bricks[carriyng].supporters].every(n => gone.has(n)) && !gone.has(carriyng)) {
                gone.add(carriyng);
                toCheck.push(carriyng);
            }
        }
    }
    return gone;
}

log('solution #2: ', sum(Object.values(bricks).map(disintegrate).map(s => s.size - 1)));
