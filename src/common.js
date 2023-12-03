const fs = require('fs');

function readLines(filename, mapLine = x => x, separator = '\n') {
    return fs.readFileSync(filename, 'utf-8').trimEnd().split(separator).map(mapLine);
}

function readCharArrays(filename, mapChar = x => x) {
    return readLines(filename, x => [...x].map(mapChar));
}

function readSingletonMaps(filename, mapValue = x => x, regex = /^(\S+)\s+(.*)/) {
    return readLines(filename, x => x.match(regex))
        .map(([, x, y]) => ({[x]: mapValue(y)}));
}

function toNumber(val) {
    return Number(val);
}

function split(regex, mapValue = x => x) {
    return line => line.split(regex).map(mapValue);
}

function sum(arr) {
    return arr.reduce((x, y) => x + y, 0);
}

function prod(arr) {
    return arr.reduce((x, y) => x * y, 1);
}

function sort(arr, reverse = false) {
    return arr.sort((x, y) => reverse ? y - x : x - y);
}

function median(arr) {
    if (arr.length) {
        let sorted = sort(arr, true);
        let middle = Math.floor(arr.length / 2);
        return arr.length % 2 ? sorted[middle] : (sorted[middle] + sorted[middle - 1]) / 2;
    }
}

function min(arr) {
    return Math.min(...arr);
}

function max(arr) {
    return Math.max(...arr);
}

function map(arr, entryFunc = x => x) {
    return arr.reduce((map, x) => {
        const [key, val] = entryFunc(x);
        map[key] = val;
        return map;
    }, {});
}

function key(items) {
    return [...(typeof items === "object" ? items : arguments)].join(':');
}

function spanYX(y, x, dy = 1, dx = 1) {
    return [...Array(2 * dy + 1).keys()].flatMap(j =>
        [...Array(2 * dx + 1).keys()].map(i => [y + j - dy, x + i - dx])
    );
}

function unique(arr) {
    const set = new Set(arr);
    set.delete(undefined);
    return [...set];
}

module.exports = {
    readLines,
    readCharArrays,
    readSingletonMaps,
    map,
    split,
    toNumber,
    key,
    min,
    max,
    sort,
    sum,
    prod,
    median,
    spanYX,
    unique,
    log: console.log
};
