#!/usr/bin/env node
const {log, readLines, split, prod} = require("./common");

/* * * * * * * *
 * * DAY  25 * *
 * * * * * * * */

let lines = readLines('../inputs/25.txt', split(/:?\s+/));

const GRAPH = new Map();
const EDGES = [];
lines.forEach(([from, ...nodes]) => nodes.forEach(to => {
    EDGES.push([from, to]);
    GRAPH.has(from) || GRAPH.set(from, new Set());
    GRAPH.get(from).add(to);
    GRAPH.has(to) || GRAPH.set(to, new Set());
    GRAPH.get(to).add(from);
}));

const e = (a, b) => a < b ? a + ':' + b : b + ':' + a;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

/**
 * @param {Map<string,Set<string>>} G
 * @param {Array<[string,string]>} E
 * @return {[number,Array<number>]}
 */
function kargerAlgorithm(G, E) {
    const graph = new Map([...G].map(([k, v]) => [k, new Set(v)]));
    const edges = E.slice();
    const edgeMultiplier = new Map(edges.map(([a, b]) => [e(a, b), 1]));
    const nodeCount = new Map([...G.keys()].map(n => [n, 1]));

    function contract(u, v) {
        if (!graph.has(u) || !graph.has(v)) {
            return;
        }
        for (let vertex of graph.get(v)) {
            if (vertex !== u) {
                edges.push(u < vertex ? [u, vertex] : [vertex, u])
                graph.get(u).add(vertex);
                graph.get(vertex).delete(v);
                graph.get(vertex).add(u);
                edgeMultiplier.set(e(u, vertex), (edgeMultiplier.get(e(u, vertex)) || 0) + edgeMultiplier.get(e(vertex, v)));
            }
        }
        graph.get(u).delete(v);
        graph.get(u).delete(u);
        graph.delete(v);
        edgeMultiplier.delete(e(u, v));
        nodeCount.set(u, nodeCount.get(u) + nodeCount.get(v));
        nodeCount.delete(v);
    }

    function getRandomEdge() {
        const index = Math.floor(Math.random() * edges.length);
        const edge = edges[index];
        const last = edges.pop();
        if (index < edges.length) {
            edges[index] = last;
        }
        return edge;
    }

    while (graph.size > 2) {
        if (!edges.length) throw new Error(graph.size);
        const [u, v] = getRandomEdge();
        contract(u, v);
    }
    return [edgeMultiplier.get(e(...graph.keys())), [...nodeCount.values()]];
}

let solution;
for (let i = 0; i < 1000; i++) {
    const [cut, sizes] = kargerAlgorithm(GRAPH, EDGES);
    log('trial', i, `found ${cut}-cut`);
    if (cut <= 3) {
        solution = sizes;
        break;
    }
}

log('solution #1: ', solution.join(' * '), '=', prod(solution));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2: ', 'Merry Christmas! 🎄');
