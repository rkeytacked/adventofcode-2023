#!/usr/bin/env node
const {log, readLines, split, key} = require("./common");

/* * * * * * * *
 * * DAY  18 * *
 * * * * * * * */

let lines = readLines('../inputs/18.txt', split(/\s/));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function readRule([d, n]) {
    return [d, Number(n)];
}

function countInside(extractor) {
    let x = 0, y = 0;
    let sortedXs = [...new Set(lines.map(line => {
        const [d, n] = extractor(line);
        return x += n * (d === 'R' ? 1 : d === 'L' ? -1 : 0);
    }))].sort((a, b) => a - b);
    let sortedYs = [...new Set(lines.map(line => {
        const [d, n] = extractor(line);
        return y += n * (d === 'D' ? 1 : d === 'U' ? -1 : 0);
    }))].sort((a, b) => a - b);

    let xValues = {};
    {
        let lastX = sortedXs[0];
        for (let x of sortedXs) {
            if ((xValues[lastX] = x - lastX)) {
                xValues[x - 1] = x - lastX;
            }
            xValues[x] = 1;
            lastX = x + 1;
        }
    }
    let yValues = {};
    {
        let lastY = sortedYs[0];
        for (let y of sortedYs) {
            if ((yValues[lastY] = y - lastY)) {
                yValues[y - 1] = y - lastY;
            }
            yValues[y] = 1;
            lastY = y + 1;
        }
    }

    let minX = 0, maxX = 0, minY = 0, maxY = 0;

    let visited = new Set();

    function addPos(x, y) {
        visited.add(key(x, y));
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }

    x = 0;
    y = 0;
    let trench = 0;
    for (let line of lines) {
        const [d, n] = extractor(line);
        switch (d) {
            case 'R':
                for (let i = n; i > 0; i -= xValues[x], x += xValues[x], trench += xValues[x]) {
                    addPos(x, y);
                }
                break;
            case 'L':
                for (let i = n; i > 0; i -= xValues[x], x -= xValues[x], trench += xValues[x]) {
                    addPos(x - xValues[x] + 1, y);
                }
                break;
            case 'U':
                for (let i = n; i > 0; i -= yValues[y], y -= yValues[y], trench += yValues[y]) {
                    addPos(x, y - yValues[y] + 1);
                }
                break;
            case 'D':
                for (let i = n; i > 0; i -= yValues[y], y += yValues[y], trench += yValues[y]) {
                    addPos(x, y);
                }
                break;
        }
    }

    let inside = false;
    let count = 0;
    for (let y = minY; y <= maxY; y += yValues[y]) {
        for (let x = minX; x <= maxX; x += xValues[x]) {
            let here = visited.has(key(x, y));
            let above = visited.has(key(x, y - yValues[y - 1]));
            let below = visited.has(key(x, y + yValues[y]));
            if (here) {
                if (inside === false) {
                    inside = above ? below ? true : 'u' : 'd';
                } else if (inside === true) {
                    inside = above ? below ? false : 'd' : 'u';
                } else if (inside === 'u') {
                    inside = above ? false : below ? true : 'u';
                } else if (inside === 'd') {
                    inside = above ? true : below ? false : 'd';
                }
            } else {
                if (inside) {
                    count += xValues[x] * yValues[y];
                }
            }
        }
    }
    return [trench, count, count + trench];
}

let [trench, inner, total] = countInside(readRule);
log('solution #1: ', trench, '+', inner, '=', total);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function readRule2([, , hex]) {
    let n = Number.parseInt(hex.substring(2, 7), 16);
    let d = hex[7] === '0' ? 'R' : hex[7] === '1' ? 'D' : hex[7] === '2' ? 'L' : 'U';
    return [d, n];
}

[trench, inner, total] = countInside(readRule2);
log('solution #2: ', trench, '+', inner, '=', total);
