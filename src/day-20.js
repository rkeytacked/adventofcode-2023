#!/usr/bin/env node
const {log, readLines, split, kgV} = require("./common");

/* * * * * * * *
 * * DAY  20 * *
 * * * * * * * */

let lines = readLines('../inputs/20.txt', split(/\s->\s|,\s/));
let modules = {};
for (let [[type, ...name], ...to] of lines) {
    modules[name.join('')] = {type, to, inputs: {}}
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

for (let name in modules) {
    for (let inputName in modules) {
        if (modules[inputName].to.includes(name)) {
            modules[name].inputs[inputName] = false;
        }
    }
}

let initial = JSON.stringify(modules);
let nr = 0;
let lastTrues = {};

function pushButton() {
    nr++;
    let toProcess = [['roadcaster', false, null]];
    let total = [1, 0];

    function sendSignal(to, signal, from) {
        toProcess.push([to, signal, from]);
        total[signal ? 1 : 0]++;
    }

    while (toProcess.length) {
        let [name, signal, from] = toProcess.shift();

        if (!modules[name]) {
            continue;
        }
        let {type, to} = modules[name];
        if (type === 'b') {
            for (let t of to) sendSignal(t, signal, name);
        } else if (type === '%') {
            if (!signal) {
                let send = modules[name].on = !modules[name].on;
                for (let t of to) sendSignal(t, send, name);
            }
        } else if (type === '&') {
            if (signal) {
                lastTrues[from] = nr;
            }
            modules[name].inputs[from] = signal;
            let send = !Object.values(modules[name].inputs).every(n => n);
            for (let t of to) sendSignal(t, send, name);
        }
    }
    return [...total, null];
}

let totalLow = 0, totalHigh = 0;
for (let i = 0; i < 1000; i++) {
    let [low, high] = pushButton();
    totalLow += low;
    totalHigh += high;
}

log('solution #1: ', totalLow, 'lows *', totalHigh, 'highs =', totalLow * totalHigh);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

// reset
Object.assign(modules, JSON.parse(initial));

let diffTrues = {};
let rxPrev = Object.keys(modules).filter(name => modules[name].to.includes('rx'));
let candidates = rxPrev.flatMap(c => Object.keys(modules[c].inputs));
while (!candidates.every(c => diffTrues[c])) {
    let lastLastTrues = {...lastTrues};
    pushButton();
    for (let n of candidates) {
        if (lastTrues[n] && lastLastTrues[n] && lastTrues[n] > lastLastTrues[n]) {
            diffTrues[n] = lastTrues[n] - lastLastTrues[n];
        }
    }
}

log('solution #2: ', kgV(candidates.map(c => diffTrues[c])));
