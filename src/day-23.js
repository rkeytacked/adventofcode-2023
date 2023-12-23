#!/usr/bin/env node
const {log, readCharArrays, key} = require("./common");

/* * * * * * * *
 * * DAY  23 * *
 * * * * * * * */

let lines = readCharArrays('../inputs/23.txt');

function readGraph() {
    let directions = [[1, 0, '>'], [0, 1, 'v'], [-1, 0, '<'], [0, -1, '^']]

    function walk(x, y, sx, sy) {
        let fx = x, fy = y;
        let count = 1;
        while (true) {
            let tx, ty;
            for (let [dx, dy] of directions) {
                let nx = x + dx, ny = y + dy;
                if (nx === sx && ny === sy) continue;
                if (lines[ny][nx] === '#') continue;
                tx = nx;
                ty = ny;
            }
            sx = x;
            sy = y;
            x = tx;
            y = ty;
            count++;
            if ((y === lines.height - 1) || ((sy !== fy || sx !== fx) && (lines[sy][sx] !== '.'))) {
                return [x, y, sx, sy, count];
            }
        }
    }

    let pathsToCheck = [[1, 1, 1, 0]];
    let costs = {[key(1, 0)]: {}};

    while (pathsToCheck.length) {
        const [x, y, sx, sy] = pathsToCheck.shift();
        const [tx, ty, wx, wy, len] = walk(x, y, sx, sy);
        let from = key(sx, sy), to = key(tx, ty);
        if ((ty < lines.height - 1) && !costs[to]) {
            costs[to] = {};
            for (let [dx, dy, chr] of directions) {
                let nx = tx + dx, ny = ty + dy;
                if (lines[ny][nx] === chr) {
                    pathsToCheck.push([nx, ny, tx, ty])
                }
            }
        }
        costs[from][to] = Math.max(costs[from][to] || 0, len);
    }

    return costs;
}

const graph = readGraph();
const start = key(1, 0);
const goal = key(lines.width - 2, lines.height - 1);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let bestSoFar = 0;

function visit(graph, from, to, pathCosts = {[from]: 0}) {
    for (const next in graph[from]) {
        if (pathCosts[next] !== undefined) continue;
        const len = pathCosts[from] + graph[from][next];
        if (next === to) {
            if (len > bestSoFar) {
                bestSoFar = len;
                log('best yet', bestSoFar, '…');
            }
        } else {
            pathCosts[next] = len;
            visit(graph, next, to, pathCosts);
            delete pathCosts[next];
        }
    }
    return bestSoFar;
}

log('solution #1: ', visit(graph, start, goal));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function makeUndirected(graph) {
    for (let from in graph) {
        for (let to in graph[from]) {
            graph[to] ||= {};
            graph[to][from] = graph[from][to];
        }
    }
}

makeUndirected(graph);
log('solution #2: ', visit(graph, start, goal));
